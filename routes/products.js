const express = require('express');
const router = express.Router();
// const multer = require('multer');
// const upload = multer({ dest: 'public/images/' });
// upload.single('file')

const Product = require('../models/product');

router.get('/', (req, res, next) => {
  const citySearch = req.query.city;

  Product.find({available: true})
    .populate('owner')
    .exec()
    .then((products) => {
      const businessMatched = products.filter((elem) => {
        if (elem.owner.address.city && elem.owner.address.city.toLowerCase() === citySearch) {
          return true;
        }
        return false;
      });
      res.json(businessMatched);
    })
    .catch(next);
});

router.post('/add-product', (req, res, next) => {
  const name = req.body.name;
  const type = req.body.type;
  const owner = req.session.currentUser._id;
  //   const available = true;
  const price = req.body.price;

  // if (req.file) {
  //   const imageUrl = `/uploads/${req.file.filename}`;
  // }

  if (!type || !price) {
    return res.status(422).json({error: 'validation'});
  }

  const newProduct = Product({
    type,
    price,
    owner,
    name
    // imageUrl
  });

  return newProduct.save()
    .then(() => {
      res.json(newProduct);
    });
});
router.post('/book', (req, res, next) => {
  const productId = req.body.productId;
  Product
    .findByIdAndUpdate(productId, {available: false})
    .then(() => {
      res.json(productId);
    });
});

router.post('/update', (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  const type = req.body.type;
  const productId = req.body.productId;
  // const imageUrl = `/uploads/${req.file.filename}`;

  Product
    .findByIdAndUpdate(productId,
      {
        name: name,
        type: type,
        price: price
        // imageUrl: imageUrl

      })
    .then(() => {
      res.json(productId);
    });
});

router.post('/return/:productId', (req, res, next) => {
  const productId = req.params.productId;
  Product
    .findByIdAndUpdate(productId, {available: true})
    .then(() => {
      res.json(productId);
    });
});

router.get('/complete/:businessId', (req, res, next) => {
  const businessId = req.params.businessId;
  Product
    .find({owner: businessId})
    .populate('owner')
    .exec((err, products) => {
      if (err) { return res.json(err).status(500); }

      return res.json(products);
    });
});

router.get('/view/:productId', (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .populate('owner')
    .exec((err, product) => {
      if (err) { next(err); }

      return res.json(product);
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
