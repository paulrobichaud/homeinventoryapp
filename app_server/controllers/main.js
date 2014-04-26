/* home page */
module.exports.about = function(req, res){
  res.render('generic-text', { title: 'About' });
};

/* signin page */
module.exports.signin = function(req, res){
  res.render('index', { title: 'Signin' });
};

/* test method for testing stuff */
module.exports.test = function(localFilePath, s3FileName, fileContentType){

var s3 = require('s3');

var client = s3.createClient({
  key: process.env.AWS_ACCESS_KEY_ID
 ,secret: process.env.AWS_SECRET_ACCESS_KEY
 ,bucket: process.env.S3_BUCKET
});
console.log("CLIENT: " + client);

var headers = {
  'Content-Type' :  fileContentType,
  'x-amz-acl' : 'public-read'
};

// upload file to s3
var uploader = client.upload(localFilePath, s3FileName, headers);

uploader.on('error', function(err) {
  console.error('unable to upload: ', err.stack);
});
uploader.on('progress', function(amountDone, amountTotal) {
  console.log("progress: ", amountDone, amountTotal);
});
uploader.on('end', function(url){
  console.log('file available at', url);
});

};

