var express = require('express');
var router = express.Router();

require("./users")(router);

module.exports = router;
