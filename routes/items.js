var ctrl = require('../app_server/controllers/items');

module.exports = function(app){
  app.get('/', ctrl.mainItemList);
  app.get('/item', ctrl.itemInfo);
  app.get('/item/new', ctrl.displayNewItemForm);
  app.post('/item/new', ctrl.newItemFormSubmit);
};


