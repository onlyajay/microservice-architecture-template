const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const http = require('http');
const jwt = require('jsonwebtoken');
const helper = require('./helper/helper');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const sql = require('./helper/newdb');
const md5 = require('md5');

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
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, x_chord, y_chord, z_chord, d_chord');
    next();
};

const jwtKey = 'my_secret_key';
const jwtExpirySeconds = "10h";

const tokenGen = (req, res) => {
    const {username, password} = req.body
    if (!username || !password) {
        return res.status(400).end();
    }

    const md5Pass = md5(password);

    sql.query(`SELECT  user_id, user_first_name, user_last_name, user_email, user_age
         FROM users WHERE user_email = ? and user_password = ?`, [username, md5Pass], function (err, result) {
        if (err) {
            console.log("error: ", err);
            return res.status(500).end();
        } else if (result && result.length > 0) {
            const userObject = JSON.parse(JSON.stringify(result[0]));
            const token = jwt.sign(userObject, jwtKey, {
                algorithm: 'HS256',
                expiresIn: jwtExpirySeconds
            });
            const response = {"expires_in": jwtExpirySeconds, "access_token": token, "token_type": "bearer"};
            res.status(200).send(helper.createResponse(helper.Success, 1, "Token Generated", response));
        } else {
            res.status(200).send(helper.createResponse(helper.Success, 0, "User not found", {}));
        }
    });
}


app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(allowCrossDomain);

app.post('/auth/login', tokenGen);

http.createServer(app).listen(port);

console.log('API server started on: ' + port);