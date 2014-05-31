var express = require('express');
var superagent = require('superagent');
var consolidate = require('consolidate');

var app = express();

app.engine('html', consolidate.handlebars);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

var user = 'cponeill';
var story_slug = 'Banksy';

var api_key = '53895bce6477a64f55000a4b';
var username = 'cponeill';
var _token = '172c5d9e848ea850c530e6e989a1e9e5';

app.get('/',function(req, res){
  superagent.get("http://api.storify.com/v1/stories/" + user + "/" + story_slug)
    .query({api_key: api_key,
       username: username,
        _token: _token})
    .set({  Accept: 'application/json' })
    .end(function(e, storifyResponse){
      if (e) next(e);     
      return res.render('index',storifyResponse.body.content);      
    })

})

app.listen(3001);