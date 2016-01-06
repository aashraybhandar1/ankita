var express=require('express'); 					//express connection
var app=express();
app.set('views',__dirname + '/views');
var lampard=app.use(express.static( 'views'));
app.use('/static', express.static('views'));
//console.log(lampard);
var handlebars = require('express3-handlebars').create({ defaultLayout:'main' });  //handlebars is the tempelate engine... main.handlebars in the default layout
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);  //run on port 3000 on localhost

var mysql=require('mysql');       			//npm package mysql

var connection=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'bhandu',
	database:'ankita',
	multipleStatements: true
});

connection.connect(function(err){     						//if errror is connecting to databse
	if(err){
		console.log('error containing is '+err);
		app.send('Im here');
		return;
	}
});

var bodyParser=(require('body-parser'));					//for post request body parser is used

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var first_name='Invalid';
var last_name='Invalid';
var email='Invalid';
var password='Invalid';

app.get('/', function(req, res){
//res.type('text/plain');
//res.send('Meadowlark Travel');
res.render('home');
});


app.get('/login', function(req, res){
//res.type('text/plain');
//res.send('Meadowlark Travel');
res.render('login');
console.log('In login');
});

app.get('/about', function(req, res){
//res.type('text/plain');
//res.send('About Meadowlark Travel');
var randomFortune =fortunes[Math.floor(Math.random() * fortunes.length)];
res.render('about',{fortune:randomFortune});
});

app.get('/comparison',function(req,res){
	res.render('comparison');
});

app.post('/compare',function(req,res){
	
	var industry=req.body.industry ;
	var ratio=req.body.ratio ;
	var query=connection.query("SELECT * FROM `company_details` WHERE `industry` =? ",industry,function(error,rows,fields){
		
		if(error){
			console.log(error);
			return ;
		}

		else{
			console.log("success");
			//console.log(fields);
			console.log(rows[0]);
		}
		if(ratio=='ratio1'){
		res.render('compare',{result:rows[0].ratio1,industry:rows[0].industry});
	}
	else{
		res.render('compare',{result:rows[0].ratio2});
	}
	});
});

app.post('/process',function(req,res){
	res.render('process');
	first_name=req.body.first_name ;
	last_name=req.body.last_name ;
	email=req.body.email ;
	password=req.body.password ;

	console.log('Im in process');

	var user={
		first_name: first_name,
		last_name: last_name,
		email:email,
		password:password
	};

	var query=connection.query('insert into login_details set ? ',user,function(err,result){
		if(err){
			console.log(err);
			app.send('Im here 2');
			return ;
		}
	});
});

app.get('/search', function(req, res){
//console.log("I'm in search");
 // input value from search
 var val = req.query.search;
 //console.log(val);

var query=connection.query("SELECT `company_name` FROM `company_details` WHERE `company_name` like '%"+req.query.search+"%' ",function(error,rows,fields){
		
		if(error){
			console.log(error);
			return ;
		}

		else{
			//console.log("success");
			//console.log(fields);
			var data=[];
			for(var i=0;i<rows.length;i++){
			//console.log(rows[i].company_name);
			data.push(rows[i].company_name);
			//res.send(rows[i].company_name);
			}
			res.send(data);
		} 

// testing the route
// res.send("WHEEE");
	});
});

app.get('/matrix', function(req, res){
//res.type('text/plain');
//res.send('Meadowlark Travel');
res.render('comparison_matrix');
//console.log('In login');
});

app.get('/matrix_eval', function(req, res){

var question="SELECT "+req.query.chain+" FROM `company_details` WHERE `company_name` = \'"+req.query.company_name +"\' ";
var query=connection.query(question,function(error,rows,fields){
		var data=[];

		//console.log(query);
		//console.log(req.query);
		console.log(rows);
		//console.log(rows[0][req.query.ratio]);
		//data.push(rows[0][req.query.ratio]);
		var i=1;
		for( i=1;i<=req.query.size_tot;i++){
			if(i==1){
				data.push(rows[0][req.query.ratio]);
				continue ;
			}
			var temp=("ratio"+i);
			data.push(rows[0][req.query[temp]]);
			
		}
		
		res.send(data);
	});

		
});

app.get('/snipet',function(req,res){
	console.log(__dirname);
	res.sendfile('views/snipet.handlebars', {root: __dirname })
});

/*app.post('/dummy',function(req,res){
	
	console.log("I'm in dummy");
	var company_name=req.body;
	console.log("I'm in dummy");
	res.send(company_name);
});*/

app.use(function(req,res){
//	res.type('text/plain');
	res.status(404);
//	res.send('404-Not found');
res.render('404')
});

app.use(function(err,req,res,next){
	console.error(err.stack);
	//res.type('text/plain');
	//res.send('500-Server Error');
	res.render('500');
});


app.listen(app.get('port'),function(){
	console.log('Express started on localhost '+app.get('port'));
});



