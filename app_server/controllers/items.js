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
  console.log(req.files); 
  res.redirect('/');
};

