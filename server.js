//require node modules
const path = require('');
const express = require('express');
const session = require('express-session');
const exphbr = require('express-handlebars');

//require routes
const routes = require('./controllers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express(); //new instance of express
const PORT = process.env.PORT || 3001;


//session middleware
const sess = {
    secret: process.env.SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}
app.use(session(sess));



// call port
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT}`))
})