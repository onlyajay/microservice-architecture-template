const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const http = require('http');
const jwt = require('jsonwebtoken');
const helper = require('./app/models/helper');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8070;

app.use(cors());

app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json');
    next();
});

// const mysql = require('mysql');
// // connection configurations
// const mc = mysql.createConnection({
//     host: 'localhost',
//     port: '3306',
//     user: 'root',
//     password: '',
//     database: 'myapp_db'
// });
// // connect to database
// mc.connect();

const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', false);
    res.header('Access-Control-Max-Age', '86400');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, x_chord, y_chord, z_chord, d_chord');
    next();
};

const jwtKey = 'my_secret_key';
const jwtExpirySeconds = "10h";

const users = {
    user1: 'password1',
    user2: 'password2'
}

const tokenGen = (req, res) => {
    // Get credentials from JSON body
    const {username, password} = req.body
    if (!username || !password || users[username] !== password) {
        // return 401 error is username or password doesn't exist, or if password does
        // not match the password in our records
        return res.status(401).end()
    }

    // Create a new token with the username in the payload
    // and which expires 1 day after issue
    //jwtExpirySeconds ="20d" // it will be expired after 20 days
    //jwtExpirySeconds= 120 // it will be expired after 120ms
    const token = jwt.sign({username}, jwtKey, {
        algorithm: 'HS256',
        expiresIn: jwtExpirySeconds
    });

    console.log('token:', token)
    const response = {"expires_in": jwtExpirySeconds, "access_token": token, "token_type": "bearer"};
    res.status(200).send(helper.createResponse(helper.Success, 1, "Token Generated", response));
}


app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(allowCrossDomain);

app.post('/token', tokenGen);
const usersRoutes = require('./app/routes/usersRoute');
usersRoutes(app)

http.createServer(app).listen(port);

console.log('API server started on: ' + port);