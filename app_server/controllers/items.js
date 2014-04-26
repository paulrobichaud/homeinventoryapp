/**
 * Module dependencies
 */
var mongoose = require('mongoose')
  , Item  = mongoose.model('Item')
  , fs = require('fs');

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
  
  // create item object with submitted parameters

  // import module for s3 file upload
  var myModule = require('./main');

  // define vars required for file upload
 
  // path to temporary file location on the server
  var localFilePath = req.files.photo.path;
  console.log("LOCALFILEPATH: " + localFilePath);
 
  // extract file extension
  var rePattern = new RegExp(/\.(.*)$/); 
  var arrMatch = localFilePath.match(rePattern);
  var fileExt = arrMatch[1]; 
  console.log("FILEEXT: " + fileExt);

  // create random name for storage in S3
  var uuid = require('node-uuid');  
  var s3FileName = uuid.v4() + '.' + fileExt;

  console.log("S3FILENAME: " + s3FileName);  
  
  var contentType = req.files.photo.type;
 
  var url = myModule.test(localFilePath, s3FileName, contentType); 
   
  console.log("VAR URL: " + url);

  var newItem = new Item({
    name: req.body.name,
    location: req.body.location,
    purchase_date: req.body.purchase_date,
    purchase_price: req.body.purchase_price,
    notes: req.body.notes,
    photo: "https://home-inventory-app.s3.amazonaws.com/" + s3FileName 
   })

  console.log(newItem);

  newItem.save( function(err,item){
    if(!err){
      console.log('Item: ' + item.name + ' saved!');
      console.log('_id of user: ' + item._id);
    }
  });
  

  res.redirect('/');
};

