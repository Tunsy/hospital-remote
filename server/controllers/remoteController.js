const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://test:test@ds031223.mlab.com:31223/todo', {
  useMongoClient: true,
});

// Create a schema
const todoSchema = new mongoose.Schema({
  item: String,
});

const Todo = mongoose.model('Todo', todoSchema);

// const data = [{ item: 'get milk' }, { item: 'walk dog' }, { item: 'get good son' }];
const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = (app) => {
  app.get('/todo', (req, res) => {
    // get data from mondodb and poass it to view
    Todo.find({}, (err, data) => {
      if (err) throw err;
      res.render('todo', { todos: data });
    });
  });

  app.post('/todo', urlencodedParser, (req, res) => {
    Todo(req.body).save((err, data) => {
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', (req, res) => {
    Todo.find({ item: req.params.item.replace(/-/g, ' ') }).remove((err, data) => {
      if (err) throw err;
      res.json(data);
    });
  });
};

