const express = require('express');
const { login, getUser, signup, updateUser, getAllUsers, deleteUser, getUserById, updateUserById } = require('../controllers/userController.js');
const { getMyOrders } = require('../controllers/orderController');
const protectMiddleware = require('../middleware/protectMiddleware.js');
const restrictMiddleware = require('../middleware/restrictMiddleware.js');

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);

router.use(protectMiddleware);

// BUG: NOT SURE BUT USED TO WORK FINE WITH THE BELOW 2 ROUTES AT THE BOTTOM
router.route('/orders').get(getMyOrders);
router.route('/profile').get(getUser).patch(updateUser);

router.use(restrictMiddleware);

router.route('/').get(getAllUsers);
router.route('/:id').get(getUserById).patch(updateUserById).delete(deleteUser);

module.exports = router;
