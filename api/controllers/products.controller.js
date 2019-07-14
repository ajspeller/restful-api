const { ObjectId } = require('mongoose').Types;

const Product = require('../models/Product.model');

exports.products_get_all = (req, res, next) => {
  Product.find()
    .select('-__v')
    .then((docs) => {
      const response = {
        count: docs.length,
        products: docs.map((doc) => {
          return {
            id: doc._id,
            name: doc.name,
            price: doc.price,
            productImage: `${req.protocol}://${req.get('host')}/${
              doc.productImage
            }`,
            request: {
              type: 'GET',
              url: `${req.protocol}://${req.get('host')}${req.originalUrl}/${
                doc._id
              }`
            }
          };
        })
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      debug(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.products_create = (req, res, next) => {
  const { name, price } = req.body;
  const { path: productImage } = req.file ? req.file : {};
  const productFields = { name, price, productImage };
  const product = new Product(productFields);

  product
    .save()
    .then((doc) => {
      const response = {
        message: 'Product created',
        product: {
          id: doc._id,
          name: doc.name,
          price: doc.price,
          productImage: `${req.protocol}://${req.get('host')}/${
            doc.productImage
          }`,
          request: {
            type: 'GET',
            url: `${req.protocol}://${req.get('host')}${req.originalUrl}/${
              doc._id
            }`
          }
        }
      };
      res.status(201).json(response);
    })
    .catch((err) => {
      debug(err);
      res.status(500).json({ error: err });
    });
};

exports.products_get_specific_product = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(404).json({
      message: `ObjectId (${id}) is invalid`
    });
  }
  Product.findById(id)
    .select('-__v')
    .then((doc) => {
      const response = {
        product: {
          id: doc._id,
          name: doc.name,
          price: doc.price,
          productImage: `${req.protocol}://${req.get('host')}/${
            doc.productImage
          }`
        },
        request: {
          type: 'GET',
          description: 'Get all products',
          url: `${req.protocol}://${req.get('host')}/products`
        }
      };
      if (doc) {
        return res.status(200).json(response);
      }
      res
        .status(404)
        .json({ message: `No product found with the specified id => ${id}` });
    })
    .catch((err) => {
      debug(err);
      res.status(500).json({ error: err });
    });
};

exports.products_update = (req, res, next) => {
  const { id } = req.params;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  console.log(id);
  console.log(updateOps);

  Product.findByIdAndUpdate(id, {
    $set: updateOps
  })
    .then((doc) => {
      console.log(doc);
      const response = {
        message: 'Product updated',
        product: {
          id,
          name: doc.name,
          price: doc.price
        },
        request: {
          type: 'GET',
          url: `${req.protocol}://${req.get('host')}/products/${id}`
        }
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.products_delete = (req, res, next) => {
  const { id } = req.params;
  Product.findByIdAndDelete(id)
    .then((doc) => {
      const response = {
        message: 'Product deleted',
        product: {
          id: doc._id,
          name: doc.name,
          price: doc.price
        },
        request: {
          type: 'POST',
          url: `${req.protocol}://${req.get('host')}/products`,
          body: {
            name: 'String',
            price: 'Number'
          }
        }
      };
      if (doc) {
        return res.status(202).json(response);
      }
      res.status(400).json({ message: 'Product not found' });
    })
    .catch((err) => {
      debug(err);
      res.status(500).json({ error: err });
    });
};
