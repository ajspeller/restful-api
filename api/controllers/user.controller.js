const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User.model');

exports.signup = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((doc) => {
      if (doc) {
        return res.status(409).json({ message: 'Email already exists' });
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err });
          } else {
            const user = new User({ email, password: hash });
            user
              .save()
              .then((doc) => {
                res.status(201).json({
                  message: 'User created'
                });
              })
              .catch((err) => {
                res.status(500).json({ error: err });
              });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.find({ email })
    .then((docs) => {
      if (docs.length === 0) {
        return res.status(401).json({
          message: 'Login failed'
        });
      }
      bcrypt.compare(password, docs[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Login failed'
          });
        }
        if (result) {
          const token = jwt.sign(
            { email: docs[0].email, userId: docs[0]._id },
            process.env.JWT_KEY,
            {
              expiresIn: '1h'
            }
          );
          return res.status(200).json({
            message: 'Auth successful',
            token
          });
        }
        res.status(401).json({
          message: 'Login failed'
        });
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.user_delete = (req, res, next) => {
  const { id } = req.params;

  User.findByIdAndRemove(id)
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          message: 'User deleted',
          user: doc
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.user_retrieve = (req, res, next) => {
  User.find()
    .then((docs) => {
      const response = {
        count: docs.length,
        users: docs
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      });
    });
};
