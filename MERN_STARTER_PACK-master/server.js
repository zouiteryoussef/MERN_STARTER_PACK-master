const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb://localhost:27017/Shoptest5',
 {
  useNewUrlParser : true
}); 

app.use(bodyParser.json());

const Article = require('./models/Articles');

app.get('/api/test', (req, res) => {
console.log(mongoose.connection.readyState);
res.send('hi');
});

app.get('/api/products', (req, res) => {
  Article.find()
    .exec()
    .then( result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error : err
      });
    });
});

app.get('/api/products/:id', (req, res) => {
  console.log('getting by id');
  const id =req.params.id;
  Article.findById(id)
    .exec()
    .then(result => {
      console.log(result);
      if (result) {
        res.status(200).json(result);
      }else{
        res.status(404).json({message : 'no valid entry found'});
      }
    })
    .catch(err => {
      console.log('error');
      console.log(err);
      res.status(500).json({ error : err});
    });
});


app.post('/api/products', (req, res) => {

  const article = new Article({
    _id : new mongoose.Types.ObjectId(),
    title : req.body.title,
    description : req.body.description,
    imageURL: req.body.imageURL,
    price:req.body.price
  });
  article
    .save()
    .then(result => {
      console.log(article, '\n done post');
      res.status(201).json({
        message : 'handling post req',
        createdArticle : article
      });
    })
    .catch(err => console.log(err));
});

app.delete('/api/products/:id', (req, res) => {
  const id = req.params.id;
  Article.remove({_id : id})
    .exec()
    .then( result => {
      res.status(200).json(result);
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({
        error : err
      });
    });
});

app.patch('/api/products/:id', (req, res) => {
  const id = req.params.id;
  const updateOps = {};
  for(const ops of req.body){
    updateOps[ops.propName] = ops.value
  }
  Article.update({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error : err
      });
    });
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
