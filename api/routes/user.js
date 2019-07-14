const express = require('express');

const checkAuth = require('../auth/check-auth');

const Usercontroller = require('../controllers/user.controller');

const router = express.Router();

router.post('/signup', Usercontroller.signup);
router.post('/login', Usercontroller.login);
router.delete('/:id', checkAuth, Usercontroller.user_delete);
router.get('/', Usercontroller.user_retrieve);

module.exports = router;
