var assert = require("chai").assert;
var should = require('should');
var supertest = require('supertest');
var myFunction = require('../routes/savefile');
var path = require('path');
var fs = require('fs');
var app = require('../app');


/*
 * @name LollyPopTest - Routes And Page Contents.
 * @description The following test all are associated to testing the routes and 
 *              the page contents to make sure it is the right page.    
 */
describe('LollyPopTest - Routes And Page Contents.', function(){
    /*
     * @name Should call the index page.
     * @description Testing to see if the index page can be returned with a status '200'.
     * @expected results  Status code '200'.
     */
   it("should call the index page", function(done){
       supertest(app)
        .get('/').expect(200).end(function(err, res){
             if(err) {
                 throw err;
             }
             res.status.should.equal(200);
             done();
         });
   });
    /*
     * @name Should throw a 404 Error.
     * @description Testing to see if calling an incorrect page can be returned with a status '404'.
     * @expected results  Status code '404'.
     */
   it("should throw a 404 Error", function(done){
       supertest(app)
        .get('/blahblah').expect(404).end(function(err, res){
             if(err) {
                 throw err;
             }
             res.status.should.equal(404);
             done();
         });
   });
    /*
     * @name Should return a HTML page.
     * @description Testing to see if the index page is a HTML page.
     * @expected results  Returns the index of the position of the following tag '</html>'. 
     *          The position has to be larger than 0 to pass.  
     */
   it("should return a HTML page", function(done){
       supertest(app)
        .get('/').end(function(err, res){
             if(err) {
                 throw err;
             }
             assert.isTrue(res.text.indexOf("</html>") > 0);
             done();
         });
   });
    /*
     * @name Should return a HTML page that containing an id="a_pics" on the page.
     * @description Testing to see if the index page is a HTML page and an element on the page has
     *              an id of a_pics. This id is specific to the index.html page.
     * @expected results  Returns the index of the position of the following tag id="a_pics". 
     *          The position has to be larger than 0 to pass.  
     */
   it("should return a HTML page that containing an id=\"a_pics\" on the page", function(done){
       supertest(app)
        .get('/').end(function(err, res){
             if(err) {
                 throw err;
             }
             assert.isTrue(res.text.indexOf("id=\"a_pics\"") > 0);
             done();
         });
   });
   
});

/*
 * @name LollyPopTest - Save File Function.
 * @description The following test all are associated to testing the save file function.    
 */
describe('LollyPopTest - Save File Function - (No file Creation)', function(){
    /*
     * @name Should return an error saying 'No file selected' - file null.
     * @description Testing to see if no file is sent and that an error is returned.
     *              Also tests the function that the POST URL uses. 
     * @expected results  'result' should see be equal to 'No file selected'     
     */
   it("should return error an saying 'No file selected' - file null", function(done){
       var req = {};
       req.file = null;
       req.body = {};
       
       myFunction.savefile(req, function(err, result){
            if(err) {
                 throw err;
             }
            assert.equal(result,"No file selected","Correct Error produced");
            done();
        });
   });
    /*
     * @name Should return an error saying 'No file selected' - body null.
     * @description Testing to see if no form body is sent and that an error is returned.
     *              Also tests the function that the POST URL uses. 
     * @expected results  'result' should see be equal to 'No file selected'.     
     */
   it("should return an error saying 'No file selected' - body null", function(done){
       var req = {};
       req.file = { fieldname: 'file',
                    originalname: 'droidpop.png',
                    encoding: '7bit'
                  };
       req.body = null;
       
       myFunction.savefile(req, function(err, result){
            if(err) {
                 throw err;
            }
            assert.equal(result,"No file selected","Correct Error produced");
            done();
        });
   });
    /*
     * @name LPT - Save File Function - With File Creation - Not A PNG.
     * @description Setting up the test conditions and then running the test.    
     */
   describe('LPT - Save File Function - With File Creation - Not A PNG', function(){
        // Temp file location
        var tempFile = path.resolve('./uploads/2faff4d4a81bed094713f242ac458f3d');
        
        /*
         * Creates a file in the uploads folder. Used to simulate a file uploaded
         * @returns {undefined}
         */
        before(function() {    
            fs.writeFile(tempFile, 'Fake Image Created', function (err) {
                if (err) throw err;
            });
        });

         /*
         * @name Should return an error saying 'Only .png files are allowed!'.
         * @description Testing to see if the file uploaded is a PNG file.
         *              Also tests the function that the POST URL uses. 
         * @expected results  'result' should see be equal to 'Only .png files are allowed!'.     
         */
        it("should return an error saying 'Only .png files are allowed!'", function(done){
            var req = {};
            req.file = { fieldname: 'file',
                         originalname: 'currentimage.jpg',
                         encoding: '7bit',
                         mimetype: 'image/jpg',
                         destination: '../uploads/',
                         filename: '2faff4d4a81bed094713f242ac458f3d',
                         path: '.\\uploads\\2faff4d4a81bed094713f242ac458f3d',
                         size: 30904 
                       };
            req.body = { submit: 'Upload Image' };

            myFunction.savefile(req, function(err, result){
                 if(err) {
                      throw err;
                  }
                 assert.equal(result,"Only .png files are allowed!","Correct Error produced"); 
                 done();
            });
        });  
   });
    
    /*
     * @name LPT - Save File Function - With File Creation - Is A PNG.
     * @description Setting up the test conditions and then running the test.    
     */
   describe('LPT - Save File Function - With File Creation - Is A PNG', function(){
        // Temp and target file location
        var tempFile = path.resolve('./uploads/2faff4d4a81bed094713f242ac458f3d');
        var targetPath = path.resolve('./public/images/pops/currentimage.png');
        
        /*
         * Creates a file in the uploads folder. Used to simulate a file uploaded
         * @returns {undefined}
         */
        before(function() {    
            fs.writeFile(tempFile, 'Fake Image Created', function (err) {
                if (err) throw err;
            });
        });
        /*
         * Delete the Image Created by the Save File Fnction.
         * @returns {undefined}
         */
        after(function() {
            fs.unlink(targetPath, function (err) {
                if (err) throw err;
            });
        });

         /*
         * @name Should return a success message Upload completed!'.
         * @description Testing to see if the file uploaded is a PNG file.
         *              Also tests the function that the POST URL uses. 
         * @expected results  'result' should be equal to 'Upload completed!'.     
         */
        it("should return a success message 'Upload completed!'", function(done){
            var req = {};
            req.file = { fieldname: 'file',
                         originalname: 'currentimage.png',
                         encoding: '7bit',
                         mimetype: 'image/png',
                         destination: '../uploads/',
                         filename: '2faff4d4a81bed094713f242ac458f3d',
                         path: '.\\uploads\\2faff4d4a81bed094713f242ac458f3d',
                         size: 30904 
                       };
            req.body = { submit: 'Upload Image' };

            myFunction.savefile(req, function(err, result){
                 if(err) {
                      throw err;
                  }
                 assert.equal(result,"Upload completed!"); 
                 done();
            });
        });  
   });
   /*
     * @name LPT - Save File Function - With File Creation - Test Form POST.
     * @description Setting up the test conditions and then running the test.    
     */
   describe('LPT - Save File Function - With File Creation - Test Form POST', function(){

        /*
         * @name Should test the POST functionality for the form.
         * @description Testing to see if the file uploaded is a PNG file and the the
         *              form works end to end. 
         * @expected results  Expected status 200 and a html page to be returned.     
         */
        it("should test the POST functionality for the form", function(done){

            var req = {};
            req.file = { fieldname: 'file',
                         originalname: 'currentimage.png',
                         encoding: '7bit',
                         mimetype: 'image/png',
                         destination: '../uploads/',
                         filename: '2faff4d4a81bed094713f242ac458f3d',
                         path: '.\\uploads\\2faff4d4a81bed094713f242ac458f3d',
                         size: 30904 
                       };
            req.body = { submit: 'Upload Image' };
            
            // Test the POST URL end to end
            supertest(app)
            .post('/menuitem').send(req).expect(200).end(function(err, res){
                 if(err) {
                     throw err;
                 }
                 res.status.should.equal(200);
                 assert.isTrue(res.text.indexOf("</html>") > 0);
                 done();
             });
        });  
   });
     
});

