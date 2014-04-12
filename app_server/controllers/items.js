/**
 * Module dependencies
 */
var mongoose = require('mongoose')
  , Item  = mongoose.model('Item')

module.exports.mainItemList = function(req, res){


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





module.exports.itemList = function(req, res){
  res.render('items-list', { 
    title: 'Stow - A tool to track all your nice stuff',
    pageHeader: {
      title: 'Stow',
      strapline: 'A tool to track all your nice stuff!'
    },
    items: [{
      name: 'Audi Q5',
      location: 'Garage',
      purchase_date: '10.12.2013',
      purchase_price: '$40,000',
      photo: '/images/photos/audi.jpeg',
      receipt: '/images/receipts/receipt.jpeg',
      notes: 'A very nice car'
    },
    { 
      name: 'Diamond Ring', 
      location: 'Safe',
      purchase_date: '8.10.2013',
      purchase_price: '$4,000',
      photo: '/images/photos/ring.jpeg',
      receipt: '/images/receipts/receipt.jpeg',
      notes: 'very nice ring'
    },
    { 
      name: 'iPhone',
      location: 'Study',
      purchase_date: '10.10.2012',
      purchase_price: '$500',
      photo: '/images/photos/iphone.jpeg',
      receipt: '/images/receipts/receipt.jpeg',
      notes: 'cool tech'
 }]});
};


module.exports.itemInfo = function(req, res){
  res.render('item-detail', { 
    title: 'Item Info',
    item: {
      name: 'iPhone',
      location: 'Study',
      purchase_date: '10.10.2012',
      purchase_price: '$500',
      photo: '/images/photos/iphone.jpeg',
      receipt: '/images/receipts/receipt.jpeg',
      notes: 'cool tech'
    } 



});
};

module.exports.displayNewItemForm = function(req, res){
  res.render('new-item', { title: 'New Item' });
};

module.exports.newItemFormSubmit = function(req, res){
  
  console.log(req.body);
  console.log("NAME: " + req.body.name); 

  console.log(req.files);

  var newItem = new Item({
    name: req.body.name,
    location: req.body.location,
    purchase_date: req.body.purchase_date,
    purchase_price: req.body.purchase_price,
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

