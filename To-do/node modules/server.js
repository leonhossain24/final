var http = require('http');
var express =require('express');
var app = express();
var server = http.Server(app);
var bodyParser = require('body-parser');





//for c9
var db;
var db_url = "mongodb://"+process.env.IP+":27017"

/* CW 9b*/
var mongoose = require("mongoose");

mongoose.connect(db_url+"/node-cw9");
mongoose.connection.on('error', function(err){
  console.log(err);
  console.log('Could not connect to mongodb');
})

var Schema = mongoose.Schema;

var taskSchema = new Schema({
  task-name: {
    type: String,
    required: "Task name required"
  },
  priority: {
    type: Number,
     required: "Task priority required"
  },
  notes: {
    type: String,
     required: "Task notes required"
  }
});

var Task = mongoose.model('Task', taskSchema)



// app.use('/static', express.static('public'));

app.use(express.static(path.join(__dirname, 'public')));




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(request, response){
  response.sendFile(__dirname+'/index.ejs');
});

app.get('/about-page', function(request, response){
  response.sendFile(__dirname+'/about.ejs');
});

app.get('/new-task', function(request, response){
  response.sendFile(__dirname+'/form.ejs');
});

var task = [];

app.post('/task/create', function(request, response){
  var new_task = new Task(request.body);
  new_task.save(function(err, data){
    if(err)
      return response.status(400)
                    .json({error: "Please input the required fields!"});
    console.log(data);
    return response.status(200)
                    .json({message: "Task successfully created"});

  })

  console.log(request.body);
  
});


// app.get('/task/list', function(request, response){
//   return response.status(200).json({tasks: task});
// })


app.get('/task/', function(request, response){
  response.render('../list.ejs', {
    tasks:task
  })
});


article.push({task-name:"Test task 1", priority:2, notes:"task 1 is not funny anymore!!!"});
article.push({task-name:"Test task 2", priority:9, notes:"task 2 is fun"});

app.get('/task/:taskID', function(request, response){
  response.render('../task.ejs', {
    task:task[request.params.taskID]
  })
});

server.listen(process.env.PORT || 3000, process.env.IP || 'localhost', function(){
  console.log('Server running');
});