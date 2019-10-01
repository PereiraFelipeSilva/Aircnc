const express = require('express');
const mongoose = require('mongoose');
const mongooseConnect = require('./mongooseConnect');
const routes = require('./routes');

const app = express();

mongoose.connect(mongooseConnect, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());
app.use(routes);

app.listen(3333);