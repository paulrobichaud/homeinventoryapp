var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  name: String,
  location: String,
  purchase_date: Date,
  purchase_price: Number,
  photo: String,
  receipt: String,
  notes: String
})

itemSchema.statics.findAll = function (callback) {
  this.find(
    {},
    callback);
}

itemSchema.statics.findById = function (id, callback) {

  this.findOne(
    {_id: id},
    callback);
}
 
mongoose.model('Item', itemSchema);
