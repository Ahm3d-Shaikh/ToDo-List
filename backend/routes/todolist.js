var express = require('express');
var router = express.Router();

router.get('/todos', (req, res, next) => {
    res.send("Todolist Page")
});


module.exports = router;