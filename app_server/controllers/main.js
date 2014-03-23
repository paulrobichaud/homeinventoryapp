/* home page */
module.exports.about = function(req, res){
  res.render('generic-text', { title: 'About' });
};

/* signin page */
module.exports.signin = function(req, res){
  res.render('index', { title: 'Signin' });
};


