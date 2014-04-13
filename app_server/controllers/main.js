/* home page */
module.exports.about = function(req, res){
  res.render('generic-text', { title: 'About' });
};

/* signin page */
module.exports.signin = function(req, res){
  res.render('index', { title: 'Signin' });
};

/* test method for testing stuff */
module.exports.test = function(req, res){


};
