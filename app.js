
/**
 * Module dependencies.
 */
var db = require('./app_server/model/db')
  , express = require('express')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')

var app = express();

// bootstrap models
var models_path = __dirname + '/app_server/model'
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(models_path + '/' + file)
})



// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/app_server/views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('./routes')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

