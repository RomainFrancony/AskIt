var socket = require('socket.io');
var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = socket.listen(server)

//Import class
var poll = require('./model/poll');
var option = require('./model/option');

//Cookie session
var session = require('cookie-session');
app.use(session({
	secret: 'pollsecretpassword'
	}))

//Body parse for POST
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//Config
app.set('view engine',"ejs");
app.use(express.static('views'));

//Favicon middleware
var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/views/img/favicon.ico'));


//Cocket
io.sockets.on('connect',  function(socket) {
	socket.on('joinRoom',function(room){
		socket.join(room);
	});	
});


//Homepage
app.get('/', function(req, res) {
	res.render('index.ejs',{message:req.session.message});	
});

//Create poll
app.post('/create',urlencodedParser, function(req,res){
	//Checking value
	var count = 0;
	for (var i = 0; i < req.body.option.length; i++) {
		if(req.body.option[i].trim() !=""){
			count += 1;
		}
	}
	//Check multi
	if(typeof(req.body.multi) == 'undefined'){
		req.body.multi = false;
	}else{
		req.body.multi = true;
	}

	//Inserting into database
	if(count >= 2 && req.body.question.trim != ""){
		poll.create(req.body.question, req.body.multi, function(id_poll){
			if (id_poll != false){
				option.create(req.body.option,id_poll, function(resultOption){
					if(resultOption == true){
						res.redirect("/"+id_poll+"/result");
					}else{
						//error
					}
				})
			}else{
				//erorr
			}
		})	
	}else{
		//redirect error
		console.log("error");
	}	
});

//View result poll
app.get('/:id([0-9]+)/result', function(req, res) {
	poll.getPollAndOptions(req.params.id,function(pollResult,optionsResult){
		if(pollResult != false){
			res.render("result.ejs",{poll:pollResult,options:optionsResult});
		}else{
			//message err
			res.redirect("/");
		}
	})
});

//Vote page
app.get('/:id([0-9]+)', function(req, res) {
	//initializing the cookie if not allready
	if(typeof(req.session.pollvoted) == 'undefined'){
		req.session.pollvoted = [];
	}
	//Check if user has allready voted	
	if(req.session.pollvoted.indexOf(Number(req.params.id)) == -1){
		poll.getPollAndOptions(req.params.id,function(pollResult,optionsResult){
			if(pollResult != false){
				res.render("vote.ejs",{poll:pollResult,options:optionsResult});
			}else{
				//message err
				res.redirect("/");
			}
		})
	}else{
		//message deja vote
		res.redirect("/"+req.params.id+"/result");
	}
});

//Vote
app.post('/vote',urlencodedParser, function(req,res){
	option.vote(req.body.vote,function(id_poll){
		if (id_poll != false){
			var pollAsked = "";
			var optionsAsked = [];
				poll.getPoll(req.body.id_poll,function(pollResult){
				if(pollResult != false){
					pollAsked = pollResult;
					option.getOptions(pollAsked.id_poll, function(optionsResult){
						if(optionsResult != false){
							optionsAsked = optionsResult;		
							//socket to other users on the poll			
							io.sockets.to(req.body.id_poll).emit("vote",pollAsked,optionsAsked);
							req.session.pollvoted.push(pollAsked.id_poll);
							res.redirect("/"+id_poll+"/result");
						}else{
							backURL=req.header('Referer') || '/';
							res.redirect(backURL);
						}
					})
				}else{
					backURL=req.header('Referer') || '/';
					res.redirect(backURL);
				}
			});	
		}else{
			//error
			backURL=req.header('Referer') || '/';
			res.redirect(backURL);
		}
	});
});


//404
app.use(function(req,res){
    res.render('404.ejs');
});


server.listen(8080);