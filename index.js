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
const res = require('express/lib/response');

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
				request.session.angajatID = results[0].Angajat_ID;
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
			connection.query('SELECT * FROM angajati WHERE Angajat_ID = ?', [request.session.angajatID], function(error, results, fields) {
			
				if (results.length > 0) {
					//request.session.loggedin = true;
					request.session.firstname = results[0].Prenume;
					request.session.lastname = results[0].Nume;
					request.session.adresa = results[0].Adresa;
					request.session.username = results[0].Username;
					
					connection.query('SELECT Nume, Prenume, Denumire, CNP, Angajat_ID FROM angajati JOIN departamente on angajati.Departament_ID = departamente.Departament_ID', 
					function(error, results_angajati, fields) {

						connection.query("SELECT sarcini.Detalii, sarcini.Sarcina_ID, departamente.Denumire FROM sarcini JOIN servicii on sarcini.Serviciu_ID = servicii.Serviciu_ID JOIN departamente on servicii.DepartamentID = departamente.Departament_ID WHERE sarcini.Status = 'Nefinalizat'", 
						function(error, results_sarcini, fields) {

							ejs.renderFile("views/manager_page.ejs", {user:{name:"haylin", angajati:results_angajati, sarcini:results_sarcini, nume:request.session.lastname,
							adresa:request.session.adresa, prenume:request.session.firstname, username:request.session.username}}, {}, function(err, str){
								response.send(str);
							});
						});
					});					

				} else {
					response.send('Server failure on manager!');
				}			
			});
		} else {
			ejs.renderFile("views/employee_trello.ejs", {user:{name:"haylin"}}, {}, function(err, str){
			response.send(str);
			});
		}
	}
});

app.get('/homeclient', function(request, response) {
	if (request.session.loggedin) {
		// CLIENT
		if (request.session.isClient) {
			//response.send("hei client");
			if (request.session.clientID) {
				connection.query('SELECT * FROM clienti WHERE Client_ID = ?', [request.session.clientID], function(error, results, fields) {
			
					if (results.length > 0) {
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
	}
});

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
				response.redirect('/homeclient');
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

app.post('/assign_task', function(request,response) {
	
	var angajat_ID = request.body.angajat_id;
	var sarcina_ID = request.body.sarcina_id;

	if (angajat_ID && sarcina_ID) {
		connection.query('INSERT INTO `angajati-sarcini` (`Angajat_ID`, `Sarcina_ID`) VALUES(?,?)', [angajat_ID, sarcina_ID], function(error, results, fields) {
			connection.query("UPDATE `sarcini` SET `Status`= 'In procesare' WHERE `Sarcina_ID`=?", [sarcina_ID], function(error, results, fields) {
				response.redirect('/home');
			});
		});
	}
	else {
		response.send('Complete all the fields!');
	}

})

app.post('/delete_employee', function(request, response) {
	var cnp = request.body.cnp;
	
	console.log(cnp);
	connection.query("DELETE FROM `angajati` WHERE `CNP`=?", [cnp], function(error, results, fields) {
		response.redirect('/home');
	});
})

app.post('/save_manager_info', function(request, response) {
	var nume = request.body.nume;
	var prenume = request.body.prenume;
	var manager_id = request.session.angajatID;
	var adresa = request.body.adresa;
	var username = request.body.username;
	
	connection.query("UPDATE `angajati` SET `Nume`=?, `Prenume`=?, `Adresa`=?, `Username`=? WHERE `Angajat_ID`=?", [nume, prenume, adresa, username, manager_id], function(error, results, fields) {
		response.redirect('/home');
	});
})

app.post('/place_order', function(request,response) {
	var serviciu_id = request.body.serviciu_id;
	var detalii = request.body.detalii;
	var data_serviciu = request.body.data_serviciu;
	var client_id = request.session.clientID;
	
	if (serviciu_id && detalii && data_serviciu && client_id) {
		connection.query('INSERT INTO sarcini (`Serviciu_ID`,`Client_ID`,`Detalii`,`Data`) VALUES(?,?,?,?)', [serviciu_id, client_id, detalii, data_serviciu], function(error, results, fields) {
			response.redirect('/homeclient');
		});
	}
	else {
		response.send('Complete all the fields!');
	}
})

app.post('/save', function(request, response) {
	var nume = request.body.nume;
	var prenume = request.body.prenume;
	var client_id = request.session.clientID;
	var adresa = request.body.adresa;
	var telefon = request.body.telefon;

	connection.query("UPDATE `clienti` SET `Nume`=?, `Prenume`=?, `Telefon`=?, `Adresa`=? WHERE `Client_ID`=?", [nume, prenume, telefon, adresa, client_id], function(error, results, fields) {
		response.redirect('/homeclient');
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
			
			response.redirect('/homeclient');
		})
	}
	else {
		response.send('Complete all the fields!');
	}
})

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})