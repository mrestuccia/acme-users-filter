// General Modules
const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');

// Coded Modules
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

db.sync()
  .then(() => {
    console.log('db synched');

    // Start listening
    let port = process.env.port || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  })
  .catch((err) => console.log(`We have an issue ${err}`));
