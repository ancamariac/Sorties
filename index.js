require('dotenv').config();
var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
const app = express()
const port = 3000
const ejs = require('ejs');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : process.env.DB_USER,
	password : process.env.DB_PASS,
	database : 'sorties'
});

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  
  ejs.renderFile("views/login.ejs", {user:{name:"haylin"}}, {}, function(err, str){
    res.send(str);
});
})

app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	
	if (username && password) {

		connection.query('SELECT * FROM angajati WHERE Username = ? AND Parola = ?', [username, password], function(error, results, fields) {
			
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				request.session.firstname = results[0].Prenume;
				request.session.lastname = results[0].Nume;
				request.session.department = results[0].Departament_ID;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});

	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}	
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.firstname + " " + request.session.lastname + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.get('/register', (req, res) => {
  
	ejs.renderFile("views/register.ejs", {user:{name:"haylin"}}, {}, function(err, str){
	  res.send(str);
  });
  })

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})