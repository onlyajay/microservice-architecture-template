'user strict';
var sql = require('./newdb.js');
var url = require('url');
var helper = require('./helper');
//Users object constructor

var Users = function (req, users) {
    this.user_id = 0;
    this.user_first_name = users.user_first_name;
    this.user_last_name = users.user_last_name;
    this.user_email = users.user_email;
    this.user_password = users.user_password;
    this.user_age = users.user_age;
};

Users.create = function (req, newUsers, result) {
    sql.query("INSERT INTO users set ?", newUsers, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

Users.getById = function (req, user_id, result) {
    sql.query("SELECT  t.* FROM users t  WHERE t.user_id= ? LIMIT 0,1", user_id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else if (res && res.length > 0) {
            result(null, res);

        } else {
            result("Record Not Found", null);
        }
    });
};

Users.totalCount = function (req, result) {
    sql.query("SELECT count(*) TotalCount FROM users t  ", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Users.totalSearchCount = function (req, searchKey, result) {
    sql.query("SELECT count(*) TotalCount FROM users t  WHERE  LOWER(t.user_first_name) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.user_last_name) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.user_email) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.user_password) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.user_age) LIKE CONCAT('%','" + searchKey + "','%') ", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Users.getAll = function (req, offset, pageSize, result) {
    sql.query("SELECT  t.* FROM users t  LIMIT ?, ?", [offset, pageSize], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('users : ', res);
            result(null, res);
        }
    });
};

Users.search = function (req, searchKey, offset, pageSize, result) {
    sql.query("SELECT  t.* FROM users t  WHERE  LOWER(t.user_first_name) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.user_last_name) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.user_email) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.user_password) LIKE CONCAT('%','" + searchKey + "','%') OR LOWER(t.user_age) LIKE CONCAT('%','" + searchKey + "','%') LIMIT ?,?", [offset, pageSize], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('users : ', res);
            result(null, res);
        }
    });
};

Users.updateById = function (req, user_id, users, result) {
    sql.query("UPDATE users SET user_first_name = ?,user_last_name = ?,user_email = ?,user_password = ?,user_age = ? WHERE user_id= ?", [users.user_first_name, users.user_last_name, users.user_email, users.user_password, users.user_age, user_id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Users.remove = function (req, user_id, result) {
    sql.query("DELETE FROM users Where user_id=?", [user_id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

module.exports = Users;
