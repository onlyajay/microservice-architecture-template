var express = require('express');
var router = express.Router();
const axios = require('axios');
const registry = require('./registry.json');

router.all('/:serviceName/:path?', (req, res) => {

    if (!registry.services[req.params.serviceName]) {
        res.send("Service Doesn't exist");
    }

    req.headers["content-length"] = JSON.stringify(req.body).length;
    const path = req.params.path ? req.params.path : "";
    const options = {
        method: req.method,
        headers: req.headers,
        data: req.body,
        // url: registry.services[req.params.serviceName].url + req.params.path,
        url: registry.services[req.params.serviceName].host + ":" + registry.services[req.params.serviceName].port +
            "/" + req.params.serviceName + "/" + path,
    };

    axios(options).then((response) => {
        res.status(200).send(response.data)
    }).catch(err => {
        console.log("err");
        console.log(err);
        res.status(200).send(err)
    });
});

module.exports = router;