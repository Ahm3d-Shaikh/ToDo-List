var express = require('express');
var router = express.Router();
var mysql = require('mysql');
require('dotenv').config();

//Details for mysql connection
var connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

//Connecting to MYSQL Database
connection.connect((err) => {
    if(err){
        console.log("Error while connecting to MYSQL " + err.stack);
    }
    console.log("Connected to MYSQL with id " + connection.threadId);
});

//Route to get all the tasks from the table
router.get('/tasks', (req, res, next) => {
    connection.query(`SELECT * FROM todos`, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

//Route to add a new task to the table. 
router.post('/tasks', (req,res,next) => {
    const task = req.body.taskName;
    // console.log(`request: ${JSON.stringify(req.body)}`, task);
    connection.query(`INSERT INTO todos (taskName, isCompleted) VALUES(?, ?)`, [task, false], (err, result) => {
        if (err) throw err;
        res.status(201).send({id: result.insertId, taskName: task, isCompleted: false});
    });
});

//Route to delete a task from the table on the basis of id.
router.delete('/tasks/:id', (req, res, next) => {
    const id = req.params.id;
    connection.query(`DELETE FROM todos WHERE id = ?`, [id], (err, result) => {
        if (err) throw err;
        res.status(204).send();
    });
});

//Route to edit the task by updating the table attributes on the basis of id.
router.put('/tasks/:id', (req, res, next) => {
    const taskId = req.params.id;
    const isCompleted = req.body.isCompleted;
    const taskName = req.body.taskName;

    const query = "UPDATE todos SET taskName = ?, isCompleted = ? WHERE id = ?";
    connection.query(query, [taskName, isCompleted, taskId], (err, result) => {
        if (err) throw err;
        res.status(200).send({id: taskId, taskName, isCompleted});
    });
});


module.exports = router;