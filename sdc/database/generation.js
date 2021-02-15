/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable max-len */
const fs = require('fs');
const path = require('path');
const faker = require('faker');

/* SET TO THE MOUNT POINT FOR LOADING YOUR CSV INTO SQL */
const directory = path.resolve('/', 'var', 'lib', 'postgresql', 'erictnvData');

/* CHANGE THIS --V-- FOR THE # OF LISTING (ET AL) FILES TO CREATE */
const fileCount = 50;

/* CHANGE THIS --V-- FOR THE # OF ROWS PER FILE */
const rowCount = 200000;

/* CHANGE THIS --V-- TO MAKE MORE USERS */
const userCount = 800000;

/* THESE WILL GIVE A CONSISTENT FORMAT TO THE IDS */

const userFormat = '0'.repeat(String(userCount).length);
const fileFormat = '0'.repeat(String(fileCount).length);
const listingFormat = '0'.repeat(String(fileCount * rowCount).length);
const reviewFormat = '0'.repeat(String(fileCount * rowCount).length + 1);

/* OTHER REQUIRED DECLARATIONS */

const categories = ['Responsive host', 'Great location', 'Helpful host', 'Comfortable beds', 'Easy check-in', 'Great views', 'A quiet neighborhood', 'Central location', 'Thoughtful touches', 'Friendly host', 'Great restaurants'];

let reviewIndex = 1;

/* HELPER FUNCTIONS */

const setFormat = (format, index) => {
  const indexLength = String(index).length;
  return format.slice(0, format.length - indexLength).concat(index);
};

const generateRatings = (id) => {
  const ratings = [];
  ratings.push(id);
  for (let i = 0; i < 6; i += 1) {
    ratings.push(Number.parseFloat(`4.${String(faker.random.number({ max: 9, min: 0 }))}`));
  }
  return ratings;
};

const generateCategories = (listing_id, num_review) => {
  const cats = [];
  cats.push(listing_id);
  for (let i = 0; i < 11; i += 1) {
    cats.push(faker.random.number({ max: num_review }));
  }
  return cats;
};

const generateReviews = (count, listing_id) => {
  let lastDate = faker.date.recent();
  const reviews = [];
  for (let k = 0; k < count; k += 1) {
    const userIdRandomizer = Math.floor(Math.random() * userCount);
    const review_id = setFormat(reviewFormat, reviewIndex);
    const user_id = setFormat(userFormat, userIdRandomizer);
    const bodyText = faker.lorem.paragraph();
    const entry_date = faker.date.past(null, lastDate);
    lastDate = entry_date;
    const categoryIndex = Math.floor(Math.random() * 11);
    const category = categories[categoryIndex];
    reviews.push(`${review_id},${user_id},${listing_id},${bodyText},${entry_date},${category}`);
    reviewIndex += 1;
  }
  return reviews;
};

/* GENERATE USERS: THE FIRST OF TWO INDEPENDENT DATA GENERATION SCRIPTS */

// eslint-disable-next-line no-unused-vars
const generateUsers = () => {
  const ws = fs.createWriteStream(`${directory}/users.csv`);
  ws.write('user_id, firstName, lastName, profileUrl, pictureUrl\n', 'utf-8');
  for (let i = 1; i < userCount; i += 1) {
    const userId = setFormat(userFormat, i);
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const profileUrl = `https://erictnv.com/user/show/${userId}`;
    const pictureUrl = `https://static-sdc-jon.s3.us-east-2.amazonaws.com/images/images/image${Math.floor(Math.random() * 1000)}.jpg`;
    ws.write(`${userId},${firstName},${lastName},${profileUrl},${pictureUrl}\n`, 'utf-8');
  }
  ws.end();
  console.log(`Generated ${userCount} users...`);
};

/* TOGGLE THE FOLLOWING TO GENERATE USERS WHEN RUNNING FILE */
generateUsers();

/* GENERATE LISTINGS: THE SECOND OF TWO INDEPENDENT DATA GENERATION SCRIPTS
  ^^^^^^^^REMEBER TO GENERATE USERS FIRST ^^^^^^^ */

// eslint-disable-next-line no-unused-vars
const generateListings = (i) => {
  // FILE SUFFIX NEEDED FOR WRITE STREAMS
  const fileSuffix = `${setFormat(fileFormat, i + 1)}.csv`;
  // CREATE WRITE STREAMS FOR ALL FILES (-> FOR DISTINCT INSERTION TABLES)
  const listingsWS = fs.createWriteStream(`${directory}/listings${fileSuffix}`);
  listingsWS.write('listing_id, num_reviews, overall_rating_avg, all_reviews, review_categories, review_ratings\n', 'utf-8');

  const reviewsWS = fs.createWriteStream(`${directory}/reviews${fileSuffix}`);
  reviewsWS.write('review_id, user_id, listing_id, rating, body, entry_date, category\n', 'utf-8');

  const categoriesWS = fs.createWriteStream(`${directory}/categories${fileSuffix}`);
  categoriesWS.write('r_h, g_l, h_h, c_b, e_c_i, g_v, a_q_n, c_l, t_t, f_h, g_r\n', 'utf-8');

  const ratingsWS = fs.createWriteStream(`${directory}/ratings${fileSuffix}`);
  ratingsWS.write('review_id, cleanliness, communication, check_in, accuracy, location, value\n', 'utf-8');

  for (let j = 1; j <= rowCount; j += 1) {
    const listing_id = setFormat(listingFormat, i * rowCount + j);
    const num_review = Math.floor(Math.random() * 11) + 5;

    const reviews = generateReviews(num_review, listing_id);
    for (let k = 0; k < reviews.length; k += 1) {
      reviewsWS.write(`${reviews[k]}\n`, 'utf-8');
    }

    const ratings = generateRatings(listing_id);
    ratingsWS.write(`${ratings.join(',')}\n`, 'utf-8');

    const categories_here = generateCategories(listing_id, num_review);
    categoriesWS.write(`${categories_here}\n`, 'utf-8');
    let overall_rating = 0.0;
    for (let k = 1; k < ratings.length; k += 1) {
      overall_rating += ratings[k];
    }
    overall_rating = Number.parseFloat(overall_rating / 6).toPrecision(2);
    listingsWS.write(`${listing_id},${num_review},${overall_rating}\n`, 'utf-8');
  }
  console.log(`Completed ${i + 1} loops so far`);
  ratingsWS.end();
  categoriesWS.end();
  reviewsWS.end();
  listingsWS.end();

  return 'Done';
};

/* TOGGLE THE FOLLOWING (COMMENT/UNCOMMENT) TO GENERATE LISTINGS AND DEPENDENT OBJECTS WHEN RUNNING FILE */

/* let loops = 0;
const insert = setInterval(() => {
  while (loops < fileCount) {
    generateListings(loops);
    loops += 1;
  } else {
    console.log('Done');
  }
}, 0.05 * rowCount); */
