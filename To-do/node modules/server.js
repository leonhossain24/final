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

var articleSchema = new Schema({
  title: {
    type: String,
    required: "Title required"
  },
  content: {
    type: String
  }
});

var Article = mongoose.model('Article', articleSchema)



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(request, response){
  response.sendFile(__dirname+'/index.html');
});

app.get('/about-page', function(request, response){
  response.sendFile(__dirname+'/about.html');
});

app.get('/new-article', function(request, response){
  response.sendFile(__dirname+'/form.html');
});

var article = [];

app.post('/article/create', function(request, response){
  var new_article = new Article(request.body);
  new_article.save(function(err, data){
    if(err)
      return response.status(400)
                    .json({error: "Please add a title"});
    console.log(data);
    return response.status(200)
                    .json({message: "Article successfully created"});

  })

  console.log(request.body);
  // article.push(request.body);
  //save(request.body)
});

app.get('/article/list', function(request, response){
  return response.status(200).json({articles: article});
})

article.push({title:"Test article 1", content:"content 1"});
article.push({title:"Test article 2", content:"content 2"});

app.get('/article/:articleID', function(request, response){
  response.render('../article.ejs', {
    article:article[request.params.articleID]
  })
});

server.listen(process.env.PORT || 3000, process.env.IP || 'localhost', function(){
  console.log('Server running');
});