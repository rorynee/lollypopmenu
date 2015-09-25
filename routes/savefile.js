/*
 * @name savefile.js
 * @description The file deals with the a saving of the file to a upload folder and then 
 *              renameing/moving it in to the file syatem. This was declared 
 *              seperatly so that it could be tested.
 * Associated files: index.js
 */

// Declaration of path used to generate url for files
var path = require('path');
// Declaration of fs used to save, delete, rename etc file on the system
var fs = require('fs');

// Export the route so it can be required in the app.js file
var exports = module.exports = {};

/*
 * @name savefile
 * @description The following function saves the file and gives back three diffrent
 *              messages depending on user input.
 *              
 * @param {type} req - Request from the user.
 * @param {type} callback - Function that deals with the return from the savefile
 *                          asynchronously.               
 * @returns: err - An error.
 *          result - String holding the relevant message.                  
 */
exports.savefile = function(req, callback){
    
    // Check if there is a body and file attribute in the request object
    if(req.file && req.body){
        // Set up the path for the new file
        var tempPath = path.resolve(req.file.path);
        var targetPath = path.resolve('./public/images/pops/'+req.file.originalname);

       // Check to see if the file is a PNG file 
       if (req.file.mimetype === 'image/png') {
           
            // Rename/Create the new file in the upload folder to the 
            // public/images/pops folder
            fs.rename(tempPath, targetPath, function(err) {
                // Return an error to the callback function
                if (err){
                    // The first pram is defines the error to 
                    // be passed to the callback function
                    callback(err);
                    return;
                }
                 // Return a result string callback function
                 // the first pram is null as there is no error
                callback(null,"Upload completed!");
            });
       } else {
            // Delete the new file in the upload folder as it 
            // was not a PNG file
            fs.unlink(tempPath, function (err) {
                if (err){
                    // The first pram is defines the error to 
                    // be passed to the callback function
                    callback(err);
                    return;
                }  
                 // Return a result string callback function
                 // the first pram is null as there is no error
                callback(null,"Only .png files are allowed!");
            });
       }   
    }else{
        // No file was selected but the upload button was pressed
        // Return a result string callback function
        // the first pram is null as there is no error
        callback(null,"No file selected");
    }
};
