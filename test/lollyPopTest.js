var assert = require("chai").assert;
var expect = require("chai").expect;
var should = require('should');
var supertest = require('supertest');
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
             expect(err).to.not.exist;
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
             expect(err).to.not.exist;
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
             expect(err).to.not.exist;
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
             expect(err).to.not.exist;
             assert.isTrue(res.text.indexOf("id=\"a_pics\"") > 0);
             done();
         });
   });
   
});