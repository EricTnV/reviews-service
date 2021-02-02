const router = require('express').Router();
const controller = require('./controller/index');

router.get('/:propertyId/reviews', controller.getReviews);

module.exports = router;
