const mongoose = require('mongoose');

const articlesSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    imageURL: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      price: {
        type: String,
        required: true
      },
});

module.exports = mongoose.model('Article', articlesSchema);