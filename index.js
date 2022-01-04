require('dotenv').config();
var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
const app = express()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "./views"))

const port = 3000
const ejs = require('ejs');
const { request } = require('http');

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

		connection.query('SELECT * FROM angajati LEFT JOIN departamente ON angajati.Angajat_ID=departamente.Manager_ID WHERE angajati.Username=? AND angajati.Parola=?', [username, password], function(error, results, fields) {
			
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				request.session.firstname = results[0].Prenume;
				request.session.lastname = results[0].Nume;
				request.session.department = results[0].Departament_ID;
				request.session.isManager = results[0].Manager_ID == results[0].Angajat_ID;
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
		// MANAGER
		if (request.session.isManager) {
			response.send('Welcome back, ' + request.session.firstname + " " + request.session.lastname + ' - manager!');
		} 

		// CLIENT
		if (request.session.isClient) {
			// nu fa acest query daca request.session.clientID este null
			if (request.session.clientID) {
				connection.query('SELECT * FROM clienti WHERE Client_ID = ?', [request.session.clientID], function(error, results, fields) {
			
					if (results.length > 0) {
						request.session.isClient = true;
						request.session.loggedin = true;
						request.session.username = results[0].Username;
						request.session.clientID = results[0].Client_ID;
						request.session.firstname = results[0].Prenume;
						request.session.lastname = results[0].Nume;
						request.session.gen = results[0].Sex;
						request.session.adresa = results[0].Adresa;
						request.session.cnp = results[0].CNP;
						request.session.password = results[0].Parola;
						request.session.data_nasterii = results[0].Data_nasterii;
						request.session.telefon = results[0].Telefon;				
						
						var clientID = request.session.clientID;
		
						ejs.renderFile("views/task_order_client.ejs", {user:{name:"haylin", nume:request.session.lastname,
						adresa:request.session.adresa, prenume:request.session.firstname, username:request.session.username,
						data_nastere:request.session.data_nasterii, cnp:request.session.cnp,
						gen:request.session.gen, telefon:request.session.telefon}}, {}, function(err, str){
							response.send(str);
						});		
		
					} else {
						response.send('Server failure');
					}			
				});			
			}			
		} 
		

	 // ANGAJAT
		if(!request.session.isClient && !request.session.isManager) {
	 		ejs.renderFile("views/employee_trello.ejs", {user:{name:"haylin"}}, {}, function(err, str){
			response.send(str);
			});
		}
	}
		 
});

app.post('/save', function(request, response) {
	var nume = request.body.nume;
	var prenume = request.body.prenume;
	var client_id = request.session.clientID;
	var adresa = request.body.adresa;
	var telefon = request.body.telefon;
	//console.log(adresa);
	//console.log(client_id);
		
	connection.query("UPDATE `clienti` SET `Nume`=?, `Prenume`=?, `Telefon`=?, `Adresa`=? WHERE `Client_ID`=?", [nume, prenume, telefon, adresa, client_id], function(error, results, fields) {
		response.redirect('/home');
	});
	
})

app.get('/register', (req, res) => {
  
	ejs.renderFile("views/register.ejs", {user:{name:"haylin"}}, {}, function(err, str){
	  res.send(str);
  });
})

app.post('/register', function(request, response) {
	var nume = request.body.nume;
	var prenume = request.body.prenume;
	var gen = request.body.gen;
	var adresa = request.body.adresa;
	var cnp = request.body.cnp;
	var departament_id = request.body.departament_id;
	var username = request.body.username;
	var password = request.body.password;
	var data_angajarii = request.body.data_angajarii;
	var data_nasterii = request.body.data_nasterii;

	if (username && password && nume && prenume && gen && adresa && cnp && departament_id && data_angajarii
		&& data_nasterii) {

		connection.query('INSERT INTO angajati (`Departament_ID`,`Nume`,`Prenume`,`Sex`,`Adresa`,`CNP`,`Username`,`Parola`, `Data_angajarii`, `Data_nasterii`) VALUES(?,?,?,?,?,?,?,?,?,?)', 
		[departament_id, nume, prenume, gen, adresa, cnp, username, password, data_angajarii, data_nasterii],
		function(error, results, fields){
			if (error) throw error;
			request.session.loggedin = true;
			request.session.username = username;
			request.session.firstname = prenume;
			request.session.lastname = nume;
			request.session.department = departament_id;
			response.redirect('/home');
		})
	}
	else {
		response.send('Complete all the fields!');
	}
})

app.get('/clientregister', (req, res) => {
  
	ejs.renderFile("views/client_register.ejs", {user:{name:"haylin"}}, {}, function(err, str){
	  res.send(str);
  });
})

app.post('/clientregister', function(request, response) {
	var nume = request.body.nume;
	var prenume = request.body.prenume;
	var gen = request.body.gen;
	var adresa = request.body.adresa;
	var cnp = request.body.cnp;
	var username = request.body.username;
	var password = request.body.password;
	var data_nasterii = request.body.data_nasterii;
	var telefon = request.body.telefon;

	if (username && password && nume && prenume && gen && adresa && cnp && telefon
		&& data_nasterii) {

		connection.query('INSERT INTO clienti (`Nume`,`Prenume`,`CNP`,`Sex`,`Adresa`,`Telefon`,`Username`,`Parola`,`Data_nasterii`) VALUES(?,?,?,?,?,?,?,?,?)', 
		[nume, prenume, cnp, gen, adresa, telefon, username, password, data_nasterii],
		function(error, results, fields){
			if (error) throw error;
			request.session.loggedin = true;
			request.session.username = username;
			request.session.firstname = prenume;
			request.session.lastname = nume;
			
			response.redirect('/home');
		})
	}
	else {
		response.send('Complete all the fields!');
	}
})

app.get('/clientlogin', (req, res) => {
  
	ejs.renderFile("views/client_login.ejs", {user:{name:"haylin"}}, 
	{}, function(err, str){
	  res.send(str);
	  
  });
})

app.post('/clientlogin', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	
	if (username && password) {

		connection.query('SELECT * FROM clienti WHERE Username = ? AND Parola = ?', [username, password], function(error, results, fields) {
			
			if (results.length > 0) {
				request.session.isClient = true;
				request.session.loggedin = true;
				request.session.username = username;
				request.session.clientID = results[0].Client_ID;
				request.session.firstname = results[0].Prenume;
				request.session.lastname = results[0].Nume;
				request.session.gen = results[0].Sex;
				request.session.adresa = results[0].Adresa;
				request.session.cnp = results[0].CNP;
				request.session.password = results[0].Parola;
				request.session.data_nasterii = results[0].Data_nasterii;
				request.session.telefon = results[0].Telefon;				
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

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})