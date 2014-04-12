var ctrl = require('../app_server/controllers/items');

module.exports = function(app){
  app.get('/', ctrl.listAllItems);
  app.get('/item/:id', ctrl.displayItemDetail);
  app.get('/item/new', ctrl.displayNewItemForm);
  app.post('/item/new', ctrl.newItemFormSubmit);
};


