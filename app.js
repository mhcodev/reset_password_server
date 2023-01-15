const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const User = require('./src/models/user.model');
const UserPassword = require('./src/models/user-password.model');

const UserRoutes = require('./src/routes/user.routes');
const UserPasswordRoutes = require('./src/routes/user-password.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('./public'));

// Application routes
app.use('/user', UserRoutes);
app.use('/user-password', UserPasswordRoutes);

// Sequelize ORM models
User.sync({ force: false });
UserPassword.sync({ force: false });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Listen in -p ${ PORT }`);
});