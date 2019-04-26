const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const router = express.Router();
require('dotenv').config()
const synapseRoutes = require('./src/server/routes/synapseRoutes');
const defPath =  "/dist/index.html";
const host = '0.0.0.0';
const port = process.env.PORT || 8080;

/**
 * 
 * Routes
 */

app.use(express.static('dist'));
app.use(cookieParser());

app.use('/api', synapseRoutes(router));

app.use(express.static(defPath));
app.listen(port, host, () => console.log(`Listening on port ${port}! ${defPath}`));


