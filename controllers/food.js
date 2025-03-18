// controllers/foods.js

const express = require("express");

const User = require("../models/user.js");

const newFood = (req, res) => {
	res.render("foods/new.ejs", {
		title: "New Food",
	});
};

const foodCreate = async (req, res) => {
	console.log("===============================================", req.body);
	try {
		const currentUser = await User.findById(req.params.userId);
    console.log('currentUser: ', currentUser)
		currentUser.pantry.push(req.body); // pushing the formData into the user model
		await currentUser.save(); // save our edits
		res.redirect(`/users/${currentUser._id}/foods`);
	} catch (err) {
		console.log(err);
		res.redirect("/");
	}
};

const index = async (req, res) => {
	try {
		const currentUser = await User.findById(req.params.userId);
		res.render("foods/index.ejs", {
			title: "Food",
			pantry: currentUser.pantry,
		});
	} catch (err) {
		console.log(err);
		res.redirect("/");
	}
};

const pantry = async (req, res) => {
	res.render("./foods/pantry.ejs", {
		title: "Pantry",
	});
};

const show = async (req, res) => {
	try {
		const currentUser = await User.findById(req.params.userId);
		const food = currentUser.pantry.id(req.params.foodId);
		res.render("foods/show.ejs", {
			title: food.title,
			food,
		});
	} catch (err) {
		console.log(err);
		res.redirect("/");
	}
};

const deleteFood = async (req, res) => {
	try {
		console.log("inside delete");
		const currentUser = await User.findById(req.params.userId);
		currentUser.pantry.id(req.params.foodId).deleteOne();
		await currentUser.save();
		res.redirect(`/users/${currentUser._id}/foods`);
	} catch (err) {
		console.log(err);
		res.redirect("/");
	}
};

const edit = async (req, res) => {
	try {
		const currentUser = await User.findById(req.params.userId);
		const food = currentUser.pantry.id(req.params.foodId);
		res.render("foods/edit.ejs", {
			title: food.title,
			food,
		});
	} catch (err) {
		console.log(err);
		res.redirect("/");
	}
};

const update = async (req, res) => {
	try {
		const currentUser = await User.findById(req.params.userId);
		console.log("current user: ", currentUser);
		const food = currentUser.pantry.id(req.params.foodId);
		console.log("food: ", food);
		food.set(req.body);
		console.log(req.body);
		await currentUser.save();

		res.redirect(`/users/${currentUser._id}/foods/${req.params.foodId}`);
	} catch (err) {
		console.log(err);
		res.redirect("/");
	}
};

module.exports = {
	User,
	newFood,
	index,
	foodCreate,
	show,
	deleteFood,
	edit,
	update,
	pantry,
};
