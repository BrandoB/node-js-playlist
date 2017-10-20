// ToDo Controller
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

var data = [
	{item: 'Get Milk'},
	{item: 'Walk dog'},
	{item: 'Kick some coding ass'}
];

module.exports = function(app){

  app.get('/todo', function(req, res){
  	res.render('todo', {todos: data});
  });

  app.post('/todo', urlencodedParser, function(req, res){
		data.push(req.body);
    console.log(data);
		res.json({todos: data});
 	});

  app.delete('/todo', function(req, res){

  });
};
