/*
 * @name Index.js
 * @description The set up file for the '/' home page route
 *              The html view to be rendered is given the same name at its routing 
 *              file i.e. index.js and index.ejs
 * Associated View: index.ejs
 */

// Deceleration of the express framework router.
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // render the index view and pass the variable 'title' to the view
  res.render('index', { title: 'Lolly Pop Menu' });
});

// Export the route so it can be required in the app.js file
module.exports = router;
