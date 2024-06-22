const express = require('express');
const app = express();
const swaggerDocs = require('./server/config/swagger/swagger.js');
const setting = require('./server/config/setting');
const cors = require('cors');
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
require('./server/config/router')(app);

// Swagger
swaggerDocs(app);
//connect to mongodb
const mongoose = require('mongoose');
// Connect to MongoDB
mongoose.connect(setting.db).then(() => {
  console.log('Connected to MongoDB');  
});

app.listen(setting.port, () => {
    console.log('Server is running on http://localhost:8000');
}); 