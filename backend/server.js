var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var mysql = require('mysql');
require('dotenv').config();

//Import Routes
var index = require('./routes/index')
var todoList = require('./routes/todolist')

//Creating an instance of express application
var app = express();

//Credentials for MYSQL Connection
var connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

//Connecting to database
connection.connect((err) => {
    if(err){
        console.log("Error while connecting to MYSQL "+ err.stack);
    }

    console.log("Connected to MYSQL with id " + connection.threadId);
})



//Views Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Setting the html render engine to ejs
app.engine('html', require('ejs').renderFile);

//Setting the bodyparser middleware to parse JSON and urlencoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Serve static files from the dist/todo/browser directory.
app.use(express.static(path.join(__dirname, '..', 'dist', 'todo', 'browser')));


//Routes
//ToDo-List API Route
app.use('/api/v1/', todoList)

//Catching all routes to serve the angular application
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'todo', 'browser','index.html'))
})

//Starting the server on port 3000
app.listen(3000, () => {
    console.log("Server is running at port 3000");
})