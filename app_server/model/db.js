
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

mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through app terminitaion');
    process.exit(0);
  });
});

