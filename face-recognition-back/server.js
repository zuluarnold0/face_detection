require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require("./controllers/Register");
const entries = require("./controllers/Update");

const app = express();
const port = process.env.PORT || 3001;

//CONNECTING TO POSTGRES DB
const db = knex({
    client: 'pg',
    connection: {
        host : process.env.HOST,
        user : process.env.USER,
        password : process.env.PASSWORD,
        database : process.env.DATABASE
    }
});

app.use(cors());
app.use(bodyParser.json());

//LOGGING IN AND RETURNING LOGGED USER
app.post('/login', (req, res) => { register.handleLogin(req, res, db, bcrypt) });

//INSERTING USER INTO LOGIN AND USERS TABLES
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

//INSERTING USER INTO LOGIN AND USERS TABLES
app.put('/image', (req, res) => { entries.handleEntries(req, res, db) });

app.listen(port, () => console.log(`recognition app is listening on port: ${port}`));
