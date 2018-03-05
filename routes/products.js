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

router.post('/book/:productId', (req, res, next) => {
  const productId = req.params.productId;
  return Product
    .findByIdAndUpdate(productId, {'available': false});
});

router.get('/view/:productId', (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .populate('owner')
    .exec((err, product) => {
      if (err) { return res.json(err).status(500); }

      return res.json(product);
    });
});

router.get('/view/:citySearch/:typeSearch', (req, res, next) => {
  const citySearch = req.params.citySearch;
  const typeSearch = req.params.typeSearch;
  Product.find({type: typeSearch})
    .populate('owner')
    .exec((err, products) => {
      if (err) { return res.json(err).status(500); }

      const businessMatched = products.filter((elem) => {
        if (elem.owner.address.city && elem.owner.address.city.toLowerCase() === citySearch) {
          return true;
        }
        return false;
      });

      return res.json(businessMatched);
    });
});

router.get('/:businessId', (req, res, next) => {
  const businessId = req.params.businessId;
  Product
    .find({owner: businessId, available: true})
    .populate('owner')
    .exec((err, products) => {
      if (err) { return res.json(err).status(500); }

      return res.json(products);
    });
});

module.exports = router;
