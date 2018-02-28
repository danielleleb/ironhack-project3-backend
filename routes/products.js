const express = require('express');
const router = express.Router();

const Product = require('../models/product');

router.post('/add-product', (req, res, next) => {
  const name = req.body.name;
  const type = req.body.type;
  const owner = req.session.currentUser._id;
  //   const available = true;
  const price = req.body.price;

  if (!type || !price) {
    return res.status(422).json({error: 'validation'});
  }

  const newProduct = Product({
    type,
    price,
    owner,
    name
  });

  return newProduct.save()
    .then(() => {
      res.json(newProduct);
    });
});

router.get('/view/:searched', (req, res, next) => {
  const searched = req.params.searched;
  Product.find()
    .populate('owner')
    .exec((err, products) => {
      if (err) { return res.json(err).status(500); }

      const businesMatched = products.filter((elem) => {
        if (!elem.owner.address.city) {
          return false;
        }
        if (elem.owner.address.city.toLowerCase() === searched) {
          return true;
        }
        return false;
      });

      return res.json(businesMatched);
    });
});

router.get('/:businessId', (req, res, next) => {
  const businessId = req.params.businessId;
  Product.find({owner: businessId}, (err, products) => {
    if (err) { return res.json(err).status(500); }

    return res.json(products);
  });
});

module.exports = router;
