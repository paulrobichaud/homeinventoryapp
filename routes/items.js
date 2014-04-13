var ctrl = require('../app_server/controllers/items');

module.exports = function(app){
  app.get('/', ctrl.listAllItems);
  app.get('/item/:id', ctrl.displayItemDetail);
  app.get('/add/item', ctrl.displayNewItemForm);
  app.post('/add/item', ctrl.newItemFormSubmit);
};


