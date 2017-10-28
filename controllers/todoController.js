// ToDo Controller
var bodyParser = require('body-parser');

var fs = require(`fs`);
var connection = fs.readFileSync('connection.txt', 'utf8').trim();

var mongoose = require('mongoose');
var urlencodedParser = bodyParser.urlencoded({extended: false});

//connect to the database
mongoose.connect(connection);

//Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
		item: String
});

var Todo = mongoose.model('Todo', todoSchema);


//var data = [
//	{item: 'Walk dog'},
//	{item: 'Kick some coding ass'}
//];

module.exports = function(app){

  app.get('/todo', function(req, res){
//get datat from mongodb abd pass ity to view
		Todo.find({}, function(err, data){
			if (err) throw err;
			res.render('todo', {todos: data});
    });
  });

  app.post('/todo', urlencodedParser, function(req, res){
		//get data from the view and add it to mongodb
		var newTodo = Todo(req.body).save(function(err, data){
			if (err) throw err;
			res.json({todos: data});
		});
 	});

  app.delete('/todo/:item', function(req, res){
		// delet the requested item from mongodb
		Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
			if (err) throw err;
			res.json(data);
		});
  });
};
