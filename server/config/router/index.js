const homeRoutes = require('./home/home_routes');
const userRoutes = require('./user/user_routes');

module.exports = (app) => {
    homeRoutes(app),
    userRoutes(app)
};