// General Modules
const express = require('express');
const swig = require('swig');
const path = require('path');
// Init Express
const app = express();
app.set('view engine','html');
app.engine('html', swig.renderFile);
swig.setDefaults('view',{noCache: true})

// Static Routes
app.use('/vendor', express.static(path.join(__dirname, '/node_modules/')));


// Custom Modules
const routes = require('./routes');

// Call the route file
app.use('/', routes);

// Start the server
let port = process.env.port || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));