const express = require('express');
const multer = require('multer');

const checkAuth = require('../auth/check-auth');
const ProductController = require('../controllers/products.controller');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, `${new Date().toISOString()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limit: {
    fileSize: 1024 * 1024 * 1
  },
  fileFilter
});

const router = express.Router();

router.get('/', ProductController.products_get_all);
router.post(
  '/',
  checkAuth,
  upload.single('productImage'),
  ProductController.products_create
);
router.get('/:id', ProductController.products_get_specific_product);
router.patch('/:id', checkAuth, ProductController.products_update);
router.delete('/:id', checkAuth, ProductController.products_delete);

module.exports = router;
