const express = require('express');
const app = express();

//connect to mongodb
const mongoose = require('mongoose');
const { default: Login } = require('./ui/Page/Login');
// Connect to MongoDB
mongoose.connect('mongodb+srv://nguyenducduypc160903:oUJoajUVaiCRJC8U@eng-center-db.pvg0yqc.mongodb.net/?retryWrites=true&w=majority&appName=eng-center-db').then(() => {
  console.log('Connected to MongoDB');
});

app.get('/', (req, res) = {
  res.send(__dirname + '/ui/Page/Home/home.html');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});