const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8070;

app.use(cors());

app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json');
    next();
});

const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', false);
    res.header('Access-Control-Max-Age', '86400');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
    next();
};

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(allowCrossDomain);

const usersRoutes = require('./app/routes/usersRoute');
usersRoutes(app)

http.createServer(app).listen(port);

console.log('API server started on: ' + port);