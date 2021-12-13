'use strict';
var helper = require('../models/helper.js');
var UsersController = require('../models/usersModel.js');

exports.listAll = function (req, res) {
    helper.checkPermission(req, "v", function (isPermited) {
        if (isPermited) {
            var pageNo = 1;
            if (req.query && req.query.pageNo) {
                pageNo = parseInt(req.query.pageNo);
            }
            var pageSize = 30;
            if (req.query && req.query.pageSize) {
                pageSize = parseInt(req.query.pageSize);
            }
            var offset = (pageNo - 1) * pageSize;
            UsersController.getAll(req, offset, pageSize, function (err, users) {
                if (err) {
                    res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
                } else {
                    var totalCount = 0;

                    UsersController.totalCount(req, function (err, total) {
                        if (err) {
                            res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
                        } else {
                            if (total && total[0] && total[0].TotalCount && total[0].TotalCount > 0) {
                                totalCount = total[0].TotalCount;
                                var result = {
                                    records: users,
                                    pageNo: pageNo,
                                    pageSize: pageSize,
                                    totalCount: totalCount
                                };


                                res.status(200).send(helper.createResponse(helper.Success, 1, "Record found", result));
                            } else {
                                res.status(200).send(helper.createResponse(helper.Error, 0, "No Record Found", ""));
                            }
                        }
                    });
                }
            });
        } else {
            res.status(403).send(helper.createResponse(helper.Error, 0, helper.authError, ""));
        }
    });
};


exports.search = function (req, res) {
    helper.checkPermission(req, "v", function (isPermited) {
        if (isPermited) {
            var pageNo = 1;
            if (req.query && req.query.pageNo) {
                pageNo = parseInt(req.query.pageNo);
            }
            var pageSize = 30;
            if (req.query && req.query.pageSize) {
                pageSize = parseInt(req.query.pageSize);
            }
            var offset = (pageNo - 1) * pageSize;
            UsersController.search(req, req.params.searchKey.toLowerCase(), offset, pageSize, function (err, users) {

                if (err) {
                    res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
                } else {
                    var totalCount = 0;
                    UsersController.totalSearchCount(req, req.params.searchKey.toLowerCase(), function (err, total) {
                        if (err) {
                            res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
                        } else {
                            if (total && total[0] && total[0].TotalCount && total[0].TotalCount > 0) {
                                totalCount = total[0].TotalCount;
                                var result = {
                                    records: users,
                                    pageNo: pageNo,
                                    pageSize: pageSize,
                                    totalCount: totalCount
                                };
                                res.status(200).send(helper.createResponse(helper.Success, 1, "Record found", result));
                            } else {
                                res.status(200).send(helper.createResponse(helper.Error, 0, "No Record Found", ""));
                            }
                        }
                    });
                }


            });
        } else {
            res.status(403).send(helper.createResponse(helper.Error, 0, helper.authError, ""));
        }
    });
};


exports.createNew = function (req, res) {
    helper.checkPermission(req, "a", function (isPermited) {
        if (isPermited) {
            var reqObj = new UsersController(req, req.body);
            var createObj = {

                user_id: 0,
                user_first_name: req.body.user_first_name,
                user_last_name: req.body.user_last_name,
                user_email: req.body.user_email,
                user_password: req.body.user_password,
                user_age: req.body.user_age,
            };
            if (!createObj.user_first_name || !createObj.user_last_name || !createObj.user_email || !createObj.user_password || !createObj.user_age) {

                res.status(400).send({error: true, message: 'Please provide required fields'});

            } else {

                UsersController.create(req, createObj, function (err, users) {

                    if (err) {
                        res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
                    } else {
                        res.status(200).send(helper.createResponse(helper.Success, 1, "Record Created", users));
                    }
                });
            }
        } else {
            res.status(403).send(helper.createResponse(helper.Error, 0, helper.authError, ""));
        }
    });
};


exports.readById = function (req, res) {
    helper.checkPermission(req, "v", function (isPermited) {
        if (isPermited) {
            UsersController.getById(req, req.params.user_id, function (err, users) {
                if (err) {
                    res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
                } else {
                    res.status(200).send(helper.createResponse(helper.Success, 1, "Record found", users[0]));
                }
            });
        } else {
            res.status(403).send(helper.createResponse(helper.Error, 0, helper.authError, ""));
        }
    });
};


exports.updateById = function (req, res) {
    helper.checkPermission(req, "u", function (isPermited) {
        if (isPermited) {
            UsersController.updateById(req, req.params.user_id, new UsersController(req, req.body), function (err, users) {
                if (err) {
                    res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
                } else {
                    res.status(200).send(helper.createResponse(helper.Success, 1, "Record Updated", ""));
                }
            });
        } else {
            res.status(403).send(helper.createResponse(helper.Error, 0, helper.authError, ""));
        }
    });
};


exports.deleteById = function (req, res) {
    helper.checkPermission(req, "d", function (isPermited) {
        if (isPermited) {
            UsersController.remove(req, req.params.user_id, function (err, users) {
                if (err) {
                    res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
                } else {
                    res.status(200).send(helper.createResponse(helper.Success, 1, "Deleted", ""));
                }
            });
        } else {
            res.status(403).send(helper.createResponse(helper.Error, 0, helper.authError, ""));
        }
    });
};
