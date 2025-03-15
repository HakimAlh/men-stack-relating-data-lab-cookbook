// controllers/foods.js

const express = require('express');

const User = require('../models/user.js');
  
  const newFood = (req, res) => {
    res.render('foods/new.ejs', {
        title: 'New Food'
    })
  };

  const foodCreate = async (req, res) => {
    try {  
        const currentUser = await User.findById(req.params.userId)
        currentUser.pantry.push(req.body) // pushing the formData into the user model
        await currentUser.save() // save our edits
        res.redirect(`/users/${currentUser._id}/foods`)
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
  }

    const index = async (req, res) => {
      try {
          const currentUser = await User.findById(req.params.userId)
          res.render('foods/index.ejs', {
              title: 'Food',
              pantry: currentUser.pantry,
          })
      } catch (err) {
          console.log(err)
          res.redirect('/')
      }
}

// router logic will go here - will be built later on in the lab

module.exports = {User, newFood, index, foodCreate}