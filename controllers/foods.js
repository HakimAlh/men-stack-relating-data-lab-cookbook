// controllers/foods.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

const foods = (req, res) => {
    res.render('foods/indexfood.ejs')
}
router.get('/', (req, res) => {
    res.render('foods/index.ejs', {
        title: 'Food'
    })
  });
  
  router.get('/', (req, res) => {
    res.render('foods/index.ejs', {
        title: 'Food'
    })
  });
  router.get('/', (req, res) => {
    res.render('foods/new.ejs', {
        title: 'Food'
    })
  });

  const newFood = (req, res) => {
    res.render('foods/new.ejs')
  }
// router logic will go here - will be built later on in the lab

module.exports = router, foods, User, express