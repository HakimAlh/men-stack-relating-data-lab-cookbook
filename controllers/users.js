const index = async (req, res) => {
	try {
		const users = await User.find();
    console.log(users)
		res.render("foods/index.ejs", {
			title: "Food",
			pantry: currentUser.pantry,
		});
	} catch (err) {
		console.log(err);
		res.redirect("/");
	}
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
