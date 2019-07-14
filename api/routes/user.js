const express = require('express');

const Usercontroller = require('../controllers/user.controller');

const router = express.Router();

router.post('/signup', Usercontroller.signup);
router.post('/login', Usercontroller.login);
router.delete('/:id', Usercontroller.user_delete);
router.get('/', Usercontroller.user_retrieve);

module.exports = router;
