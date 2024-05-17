var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', (req, res, next) => {
    var filePath = path.join(__dirname, '..', '..', 'src','app','todolist','todolist.component.html');
    res.sendFile(filePath);
});


module.exports = router;