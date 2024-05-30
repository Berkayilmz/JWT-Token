require('dotenv').config();
require('./config/database').connect();

const express = require('express');
const app = express();
const User = require('./model/user');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
const { JWT_KEY } = process.env;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!(firstName && lastName && email && password)) {
            return res.status(400).send('All inputs are required!');
        }

        const oldUser = await User.findOne({email});

        if (oldUser) {
            return res.status(400).send('User already exists! Please Login!');
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: encryptedPassword
        })

        const token = jwt.sign(
            { user_id: user._id, email },
            JWT_KEY,
            {
                expiresIn: '2m'
            }
        )

        user.token = token;
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send({error: 'Internal Server Error!'});
    }
});

app.post('/login', async (req, res) => {

});

module.exports = app;