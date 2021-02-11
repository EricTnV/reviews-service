const Router = require('express-promise-router');

const db = require('../database');

const router = new Router();

router.get('/:propertyId/reviews', async (req, res) => {
  const { propertyId } = req.params;
  console.log(`Well, you got here at least:${propertyId}`);
  const { rows } = await db.query('SELECT * FROM reviews.listings WHERE listing_id = $1', [propertyId]).catch((err) => console.log(err));
  res.send(rows[0]);
  console.log(rows[0]);
});

module.exports = router;
