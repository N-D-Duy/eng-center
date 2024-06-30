const express = require('express');
const app = express();
const swaggerDocs = require('./server/config/swagger/swagger.js');
const setting = require('./server/config/setting');
const rateLimit = require('express-rate-limit');

/* const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 500, // limit each IP to 500 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
}); */

const cors = require('cors');
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
/* app.use('/api/', limiter); */

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