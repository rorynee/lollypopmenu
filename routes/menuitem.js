/*
 * @name menuitem.js
 * @description The file deals with the a file upload using a POST to '/menuitem'
 *              from the home page route. As this page redirects to the '/' route 
 *              there is no associated views of the same name.
 * Associated View: index.ejs
 */

// Deceleration of the express framework router.
var express = require('express');
var router = express.Router();
// Deceleration of multer used to access the multi form data
var multer = require('multer');
var upload = multer({ dest: './uploads/' }); //https://github.com/expressjs/multer
// Decelaration of the savefile function used by the POST function
var myFunction = require('./savefile');

/* POST to /menuitem */
router.post('/', upload.single('file'), function(req, res, next) {
    
    /*
     * @name savefile
     * @description The following callback function saves the file and gives back three diffrent
     *              messages depending on user input.
     * @param {type} req - Request from the user.
     * @param {type} callback - Function that deals with the return from the savefile
     *                          asynchronously.               
     * @returns: err - An error.
     *          result - String holding the relevant message.                  
     */
    myFunction.savefile(req, function(err, result){ 
        if (err) throw err;
        if(result === "Upload completed!"){
            res.redirect("/");
        }else if(result === "No file selected"){ 
            res.render('index', { title: 'Lolly Pop Menu', message: "Sorry no file selected" });
        } else{
           res.render('index', { title: 'Lolly Pop Menu', message: "Only .png files are allowed!" });
        }
    });
  
});

// Export the route so it can be required in the app.js file
module.exports = router;