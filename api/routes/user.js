const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const debug = require('debug')('app:user');

const User = require('../models/User.model');

const router = express.Router();

router.post('/signup', (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((doc) => {
      debug(doc);
      if (doc) {
        return res.status(409).json({ message: 'Email already exists' });
      } else {
        bcrypt.hash(email, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err });
          } else {
            const user = new User({ email, password: hash });
            user
              .save()
              .then((doc) => {
                debug(doc);
                res.status(201).json({
                  message: 'User created'
                });
              })
              .catch((err) => {
                debug(err);
                res.status(500).json({ error: err });
              });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({});
    });
});

router.post('/signin', (req, res, next) => {
  const { email, password } = req.body;

  User.find({ email })
    .then((doc) => {})
    .catch((err) => {
      res.status(500).json({});
    });
});

router.delete('/:id', (req, res, next) => {
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
});

router.get('/', (req, res, next) => {
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
});

module.exports = router;
