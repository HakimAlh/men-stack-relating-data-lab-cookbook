// require('dotenv').config()
const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
const session = require('express-session')
const MongoStore = require('connect-mongo')

const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')
const path = require('path')
const isSignedIn = require('./middleware/is-signed-in')
const passUserToView = require('./middleware/pass-user-to-view')
const router = express.Router();

const port = process.env.PORT ? process.env.PORT : '3000'

//Creates a connection to MONGO database
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        ttl: 7 * 24 * 60 * 60 // 1 week in seconds
    }),
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week in milliseconds
        httpOnly: true,
        secure: false,
    }
}))
app.use(passUserToView)


const authController = require('./controllers/auth.js');
const foodsController = require('./controllers/food.js');

//CONTROLLERS
const pagesCtrl = require('./controllers/pages')
const authCtrl = require('./controllers/auth')

//MIDDLWARE
const Food = require('./models/user.js')


//ROUTE HANDLERS
app.get('/', pagesCtrl.home)
app.get('/auth/sign-up', authCtrl.signUp)
app.post('/auth/sign-up', authCtrl.addUser)
app.get('/auth/sign-in', authCtrl.signInForm)
app.post('/auth/sign-in', authCtrl.signIn)
app.get('/auth/sign-out', authCtrl.signOut)
app.get('/users/foods/pantry', foodsController.pantry)
app.use(isSignedIn) // anything under here, the user must be signed in

app.get('/users/:userId/foods', foodsController.index)
app.get('/users/:userId/foods/new', foodsController.newFood)

// CRUD
app.post('/users/:userId/foods/', foodsController.foodCreate)
app.get('/users/:userId/foods/:foodId', foodsController.show) 
app.delete('/users/:userId/foods/:foodId', foodsController.deleteFood)
app.get('/users/:userId/foods/:foodId/edit', foodsController.edit)
app.put('/users/:userId/foods/:foodId', foodsController.update)

app.listen(port, () => {
    console.log(`The express app is ready on port ${port}`)
})