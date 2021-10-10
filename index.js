const express = require('express');
const initHandlebars = require('./config/handlebars');
const routes = require('./router');
const config = require('./config/config.json')[
  process.env.NODE_ENV || 'development'
];
const initDb = require('./config/database');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use('/content', express.static('./public'));

initHandlebars(app);

app.use(routes);

initDb(config.DB_CONNECTION)
  .then(() => {
    app.listen(config.PORT, () => {
      console.log(`App listening on port ${config.PORT}!`);
    });
  })
  .catch((err) => {
    console.log('There is a problem:');
    console.log(err);
  });
