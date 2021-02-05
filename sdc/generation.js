const fs = require('fs');
const path = require('path');
const faker = require('faker');

const directory = path.join(__dirname, 'sampleData');

/* CHANGE THIS --V-- TO MAKE MORE LISTING FILES */
const fileCount = 1;

/* CHANGE THIS --V-- TO MAKE MORE LISTING ROWS PER FILE */
const rowCount = 100;

/* CHANGE THIS --V-- TO MAKE MORE USERS */
const userCount = 100;

const reviewIndex = 1;

const userFormat = '0'.repeat(String(userCount).length);
const fileFormat = '0'.repeat(String(fileCount).length);
const listingFormat = '0'.repeat(String(fileCount * rowCount).length);
const reviewFormat = '0'.repeat(String(fileCount * rowCount).length + 1);

const generateUsers = () => {
  const ws = fs.createWriteStream(`${directory}/users.csv`);
  ws.write('user_id, firstName, lastName, email, profileUrl, pictureUrl, password\n', 'utf-8');
  for (let i = 1; i < userCount; i += 1) {
    const userId = userFormat.slice(0, String(userCount).length - String(i).length).concat(i);
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    const profileUrl = `https://erictnv.com/user/show/${userId}`;
    const pictureUrl = `https://static-sdc-jon.s3.us-east-2.amazonaws.com/images/images/image${Math.floor(Math.random() * 1000)}.jpg`;
    const password = faker.internet.password();
    ws.write(`${i},${userId},${firstName},${lastName},${email},${profileUrl},${pictureUrl},${password}\n`, 'utf-8');
  }
};

generateUsers();

/* const generateListings = () => {
  for (let i = 0; i < fileCount; i += 1) {
    const listing = fs.createWriteStream(`${directory}/listing${fileFormat.slice(0, fileFormat.length - String(i).length).concat(i)}.csv`)
    listing.write('listing_id, num_reviews, all_reviews, review_categories, review_ratings, overall_ratings, overall_rating_avg\n', 'utf-8');

    const review = fs.createWriteStream(`${directory}/review${fileFormat.slice(0, fileFormat.length - String[i].length).concat(i)}.csv`)
    review.write('review_id, user_id, listing_id, rating, body, entry_date, category\n', 'utf-8')

    for (let j = 1; j < rowCount; j += 1) {
      const listing_id = listingFormat.slice(0, listingFormat.length - String(j).length).concat(j);
      const num_review = Math.floor(Math.random() * 11) + 5;
      for (let k = 0; k < num_review; k += 1) {
        const userIdRandomizer = Math.floor(Math.random() * 1000)
        const review_id = reviewFormat.slice(0, reviewFormat.length - String(reviewIndex).length).concat(reviewIndex)
        const user_id = userFormat.slice(0, userFormat.length - String(userIdRandomizer.length).length).concat(userIdRandomizer)
// RESUME HERE:  review.write(`${review_id},${},${user_id},${listing_id},${}\n`, 'utf-8');
        reviewIndex += 1;
      }
    }
  }
}

generateListings();
 */
