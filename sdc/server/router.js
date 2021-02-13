const Router = require('express-promise-router');

const db = require('../database');

const router = new Router();

router.get('/:propertyId/reviews', async (req, res) => {
  const { propertyId } = req.params;
  const { rows } = await db.query('SELECT * FROM listings.reviews WHERE (listing_id = $1)', [propertyId]);
  const listing = rows[0];
  /*   listing.all_reviews = JSON.parse(listing.all_reviews); */
  console.log(listing.review_categories);
  listing.review_categories = JSON.parse(listing.review_categories);
  listing.review_ratings = JSON.parse(listing.review_ratings);
  res.status(200).json(listing);
});

module.exports = router;
