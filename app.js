const express = require('express');
const app = express();
const morgan = require('morgan');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');


//connecting to dkt mongodb account
const mongoURL = 'mongodb+srv://maxi:maxi12345@cluster0-bp7af.mongodb.net/nodedb?retryWrites=true&w=majority';
mongoose
  .connect(
    mongoURL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))
mongoose.Promise = global.Promise;

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cors implementation
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") { 
    res.header('Access-Contril-Allow-Methods', 'PUT, POST, PATCH, DELETE, PATCH, GET');
    return res.status(200).json({});
  }
  next();
});

//routers imported
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);

app.use((req, res, next) => {
  const error = new Error('Api Not Found');
  error.status = 404;
  next(error);
  
})

app.use((error, req, res, next) => { 
  res.status(error.status) || 500;
  res.json({
    error: {
      message:error.message
    }
  });
})
module.exports = app;