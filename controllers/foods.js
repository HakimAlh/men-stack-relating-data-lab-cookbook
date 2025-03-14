// controllers/foods.js

const express = require('express');

const User = require('../models/user.js');

const foods = (req, res) => {
    res.render('foods/indexfood.ejs')
}
const index = (req, res) => {
    res.render('foods/index.ejs', {
        title: 'Food'
    })
  };
  
  const newFood = (req, res) => {
    res.render('foods/new.ejs', {
        title: 'New Food'
    })
  };

// router logic will go here - will be built later on in the lab

module.exports = {foods, User, express, newFood, index}