const express = require('express');
const initHandlebars = require('./config/handlebars');
const routes = require('./router');
const config = require('./config/config.json')[
  process.env.NODE_ENV || 'development'
];
const initDb = require('./config/database');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use('/content', express.static('./public'));

app.use(cookieParser());

app.use(authMiddleware.auth);

initHandlebars(app);

app.use(routes);

initDb(
  'mongodb+srv://admin:75xPWBsZobegO1nK@cluster01.eko3p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
)
  .then(() => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log('There is a problem:');
    console.log(err);
  });
