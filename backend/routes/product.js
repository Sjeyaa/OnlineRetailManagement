
const express = require('express');
const { getProducts, newProduct ,getSingleProduct, updateProduct ,deleteProduct,createReview ,getReviews, deleteReview} = require('../controllers/productController');
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/authenticate');

router.route('/products').get(getProducts);




router.route('/product/:id').get(getSingleProduct);

router.route('/product/:id').put(updateProduct);

router.route('/product/:id').delete(deleteProduct);

router.route('/review').put(isAuthenticatedUser,createReview);
router.route('/reviews').get(getReviews);
router.route('/review').delete(deleteReview);

//Admin routes
router.route('admin/product/new').post(isAuthenticatedUser , authorizeRoles('admin') ,newProduct);
module.exports = router;
