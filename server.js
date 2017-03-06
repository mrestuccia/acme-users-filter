// General Modules
const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');

// Modules
const db = require('./db');

// Init Express
const app = express();

// Template Engine
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true })

// Static Routes
app.use('/vendor', express.static(path.join(__dirname, '/node_modules/')));

// Custom Modules
const routes = require('./routes');

// Call the route file
app.use('/', routes);

// Sync
db.sync()
  .then(() => {
    db.seed()
  })
  .catch(err => console.log(err));

// Start listening
let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));