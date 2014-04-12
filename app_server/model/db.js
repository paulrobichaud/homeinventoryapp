
// import mongoose
var mongoose = require('mongoose');

// build the connection string
var dbURI = 'mongodb://stowappuser:stowpass@oceanic.mongohq.com:10023/app23303171';

// connect
mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});

//mongoose.connection.on('disconnected', function() {
 // console.log('Mongoose disconnected');
//});

/**
 * @msg message explaining reason for the db disconnect
 * @callback function to run when the connection is closed
*/
var gracefulShutdown = function (msg, callback) {
  mongoose.connection.close( function() {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

process.on('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGINT', function() {
  gracefulShutdown('app termination', function() {
    process.exit(0);
  });
});

process.on('SIGTERM', function() {
  gracefulShutdown('Heroku app shutdown', function() {
    process.exit(0);
  });
});

