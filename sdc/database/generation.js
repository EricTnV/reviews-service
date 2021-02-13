/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable max-len */
const fs = require('fs');
const path = require('path');
const faker = require('faker');

/* CHANGE THIS --V-- FOR THE # OF LISTING FILES TO CREATE */
const fileCount = 50;

/* CHANGE THIS --V-- FOR THE # OF ROWS PER FILE */
const rowCount = 200;

/* CHANGE THIS --V-- TO MAKE MORE USERS */
const userCount = 800000;

/* THESE WILL GIVE A CONSISTENT FORMAT TO THE IDS */

const userFormat = '0'.repeat(String(userCount).length);
const fileFormat = '0'.repeat(String(fileCount).length);
const listingFormat = '0'.repeat(String(fileCount * rowCount).length);

/* OTHER REQUIRED DECLARATIONS */

const categories = ['Responsive host', 'Great location', 'Helpful host', 'Comfortable beds', 'Easy check-in', 'Great views', 'A quiet neighborhood', 'Central location', 'Thoughtful touches', 'Friendly host', 'Great restaurants'];

const ratingStrs = ['cleanliness', 'communication', 'check_in', 'accuracy', 'location', 'value'];

const users = {};

/* HELPER FUNCTIONS */

const setFormat = (format, index) => {
  const indexLength = String(index).length;
  return format.slice(0, format.length - indexLength).concat(index);
};

const generateRatings = () => {
  const ratings = [];
  for (let i = 0; i < 6; i += 1) {
    ratings.push({
      title: ratingStrs[i],
      rating: Number.parseFloat(`4.${String(faker.random.number({ max: 9, min: 0 }))}`),
    });
  }
  return ratings;
};

const generateCategories = (count) => {
  const cats = [];
  for (let i = 0; i < 11; i += 1) {
    cats.push({
      title: categories[i],
      count: faker.random.number({ max: count }),
    });
  }
  return cats;
};

const generateReviews = (count) => {
  let lastDate = faker.date.recent();
  const reviews = [];
  for (let k = 0; k < count; k += 1) {
    const userIdRandomizer = Math.floor(Math.random() * userCount);
    const user_info = {};
    const user_id = setFormat(userFormat, userIdRandomizer);
    if (users[userIdRandomizer] === undefined) {
      user_info.user_id = user_id;
      user_info.firstName = faker.name.firstName();
      user_info.lastName = faker.name.lastName();
      user_info.profileUrl = `https://erictnv.com/user/show/${user_id}`;
      user_info.pictureUrl = `https://static-sdc-jon.s3.us-east-2.amazonaws.com/images/images/image${Math.floor(Math.random() * 1000)}.jpg`;
      users[userIdRandomizer] = user_info;
    } else {
      const user = users[userIdRandomizer];
      const keys = Object.keys(user);
      for (let j = 0; j < keys.length; j += 1) {
        user_info[keys[j]] = user[keys[j]];
      }
    }
    const bodyText = faker.lorem.paragraph();
    const entry_date = faker.date.past(null, lastDate);
    lastDate = entry_date;
    const categoryIndex = Math.floor(Math.random() * 11);
    const category = categories[categoryIndex];
    reviews.push({
      user_info,
      bodyText,
      entry_date,
      category,
    });
  }
  return reviews;
};

// MAIN FUNCTION

const generateListings = (i) => {
  const fileSuffix = `${setFormat(fileFormat, i + 1)}.csv`;
  const listingsWS = fs.createWriteStream(`/var/lib/postgresql/erictnvData/listings${fileSuffix}`);
  listingsWS.write('listing_id, num_reviews, all_reviews, review_categories, review_ratings, overall_rating_avg\n', 'utf-8');

  for (let j = 1; j <= rowCount; j += 1) {
    const id = setFormat(listingFormat, i * rowCount + j);
    const num_review = Math.floor(Math.random() * 11) + 5;
    const reviews = generateReviews(num_review);
    const ratings = generateRatings();
    const categories_here = generateCategories(num_review);

    let overall_rating = 0.0;
    ratings.forEach((each_rating) => {
      overall_rating += each_rating.rating;
    });
    overall_rating = Number.parseFloat(overall_rating / 6).toPrecision(2);

    listingsWS.write(`${id}|${num_review}|${JSON.stringify(reviews)}|${JSON.stringify(categories_here)}|${JSON.stringify(ratings)}|${overall_rating}\n`, 'utf-8');
  }
  console.log(`Completed ${i + 1} loops so far`);
  listingsWS.end();
};

// LOOPING FOR MEMORY MANAGEMENT

let loops = 1;
generateListings(0);
setInterval(() => {
  if (loops < fileCount) {
    generateListings(loops);
    loops += 1;
  } else {
    console.log('Done');
  }
}, 0.02 * rowCount);
