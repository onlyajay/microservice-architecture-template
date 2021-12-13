const jwt = require('jsonwebtoken');

function Helper() {
    this.Success = "Success";
    this.Error = "Error";
    this.authError = "authError";

    this.createResponse = function (status, code, message, document) {
        return {"status": status, "code": code, "message": message, "document": document};
    };

    this.checkPermission = function (req, action, _callback) {
        try {
            const jwtKey = 'my_secret_key';
            const token = this.extractToken(req);
            if (!token) {
                return _callback(0);
            }

            jwt.verify(token, jwtKey, function(err, decoded) {
                if (err) {
                    return _callback(0);
                }
                return _callback(1);
            });
        } catch (ex) {
            console.error("Internal error:" + ex);
            return _callback(0);
        }
    };

    this.extractToken = function(req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
}

module.exports = new Helper();
