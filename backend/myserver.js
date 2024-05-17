var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var mysql = require('mysql');


var index = require('./routes/index')
var todoList = require('./routes/todolist')


const { appendFile } = require('fs')

var app = express();

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rollno.165239',
    database: 'todoList'
})

connection.connect((err) => {
    if(err){
        console.log("Error while connecting to MYSQL "+ err.stack);
    }

    console.log("Connected to MYSQL with id " + connection.threadId);
})



//Views Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '..', 'dist', 'todo', 'browser')));


//Routes
//app.use('/', index);
app.use('/api/v1/', todoList)


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'todo', 'browser','index.html'))
})


app.listen(3000, () => {
    console.log("Server is running at port 3000");
})