/**
 * Module dependencies
 */
var mongoose = require('mongoose')
  , Item  = mongoose.model('Item')

module.exports.listAllItems = function(req, res){

  console.log("Getting all items ...");
  Item.findAll(
    function ( err, items ) {
      if(!err){
        console.log(items);
        res.set('Content-Type', 'text/html')

        res.render('items-list', {
          title: 'Stow - A tool to track all your nice stuff',
            pageHeader: {
              title: 'Stow',
              strapline: 'A tool to track all your nice stuff!'
            },
          items: items
        }) 
      }else{
         console.log(err);
         res.json({"status":"error", "error":"Error finding all items"});
       }
    })
};

module.exports.displayItemDetail = function(req, res){
  console.log("Finding item _id: " + req.params.id);

  Item.findById( req.params.id, function(err,item) {
    if(err){
      console.log(err);
      res.get('/');
    }else{
      console.log(item);
      res.render('item-detail', {
        title: 'Item Info',
        item: {
          name: item.name,
          location: item.location,
          purchase_date: item.purchase_date,
          purchase_price: item.purchase_price,
          photo: item.photo,
          receipt: item.receipt,
          notes: item.notes
        }
      });
    }
   });
};

module.exports.displayNewItemForm = function(req, res){
  res.render('new-item', { title: 'New Item' });
};

module.exports.newItemFormSubmit = function(req, res){
  
  console.log(req.body);

  var newItem = new Item({
    name: req.body.name,
    location: req.body.location,
    purchase_date: req.body.purchase_date,
    purchase_price: req.body.purchase_price,
    photo: req.body.photo,
    receipt: req.body.receipt,
    notes: req.body.notes
  })

  newItem.save( function(err,item){
    if(!err){
      console.log('Item: ' + item.name + ' saved!');
      console.log('_id of user: ' + item._id);
    }
  });
  res.redirect('/');
};

