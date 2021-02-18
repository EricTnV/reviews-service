/* eslint-disable no-console */
const Router = require('express-promise-router');

const db = require('../database');

const router = new Router();

const categories = ['Responsive host', 'Great location', 'Helpful host', 'Comfortable beds', 'Easy check-in', 'Great views', 'A quiet neighborhood', 'Central location', 'Thoughtful touches', 'Friendly host', 'Great restaurants'];

router.get('/:propertyId/reviews', async (req, res) => {
  const { propertyId } = req.params;

  const listing = (await db.query('SELECT * FROM listings.listing WHERE (listing_id = $1)', [propertyId]).catch((err) => console.log(err))).rows[0];

  listing.all_reviews = [];
  listing.review_categories = [];
  listing.review_ratings = [];

  await db.query('select DISTINCT ON (a.user_id) a.user_id, a.firstName, a.lastName, a.profileUrl, a.pictureUrl, b.body, b.entry_date, b.category from users.user a inner join users.review b on (a.user_id = b.user_id) AND (b.listing_id = $1);', [propertyId]).then((results) => {
    for (let i = 0; i < results.rows.length; i += 1) {
      listing.all_reviews.push({
        user_info: {
          user_id: results.rows[i].user_id,
          firstName: results.rows[i].firstname,
          lastName: results.rows[i].lastname,
          profileUrl: results.rows[i].profileurl,
          pictureUrl: results.rows[i].pictureurl,
        },
        body: results.rows[i].body,
        entry_date: results.rows[i].entry_date,
        category: results.rows[i].category,
      });
    }
  }).catch((err) => console.log(err));

  const categoriesHere = (await db.query('SELECT * from listings.categories WHERE (listing_id = $1)', [propertyId]).catch((err) => console.log(err))).rows[0];
  const catVals = Object.values(categoriesHere);
  for (let i = 0; i < catVals.length; i += 1) {
    if (catVals[i + 1] !== 0) {
      listing.review_categories.push({
        title: categories[i],
        count: catVals[i + 1],
      });
    }
  }

  const ratings = (await db.query('SELECT * from listings.ratings WHERE (listing_id = $1)', [propertyId]).catch((err) => console.log(err))).rows[0];
  const ratKeys = Object.keys(ratings);
  for (let i = 1; i < Object.keys(ratings).length; i += 1) {
    listing.review_ratings.push({
      title: ratKeys[i],
      rating: ratings[ratKeys[i]],
    });
  }

  res.status(200).json(listing);
});

module.exports = router;
