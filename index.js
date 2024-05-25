const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./server/config/router')(app);

//connect to mongodb
const mongoose = require('mongoose');
// Connect to MongoDB
mongoose.connect('mongodb+srv://nguyenducduypc160903:oUJoajUVaiCRJC8U@eng-center-db.pvg0yqc.mongodb.net/?retryWrites=true&w=majority&appName=eng-center-db').then(() => {
  console.log('Connected to MongoDB');
});

app.get('/', (req, res) => {
    //home page home.html
    res.sendFile(__dirname + '/presentation/home.html');
});

app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
});