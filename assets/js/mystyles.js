/*
 * @name mystyle.js
 * @description This file holds and implements all the jQueary 
 *              events that are triggered.
 * 
 */

/**
 * @name getImages
 * @description Get current available images from the folder 'images/pops/' and 
 *              place them on screen. 
 */
function getImages() {
        // Empty the div with the id a_pics
        $("#a_pics").empty();
        // Declare the directory and the file types to choose
        var dir = "images/pops/";
        var fileextension = ".png";
        $.ajax({
            // This will retrieve the contents of the folder if the folder is configured as 'browsable'
            url: dir,
            success: function (data) {
                // List all png file names on tot the page
                $(data).find("a:contains(" + fileextension + ")").each(function () {
                    // Build the file url
                    var filename = this.href.replace(window.location.host, "").replace("http:///", "");
                    // Append the url and the image tag to the div with an id a_pics
                    $("#a_pics").append($("<img id=\"dragimg\" src=" + filename + "></img>"));
                });
            }
        });
    return true;    
}

/**
 * @name handleDropEventAToB
 * @description Handle a user moves and dropping an image from a_pic to b_pic
 * @param {type} event
 * @param {type} ui
 * @returns {Boolean}
 */
function handleDropEventAToB( event, ui ) {
  var draggable = ui.draggable;
  // Add the image to b_pics
  $("#b_pics").append("<img id=\"sortimg\" src=" + draggable.attr('src') + "></img>");
  // remove the image form a_pics
  $("#a_pics").find('img[src$="'+draggable.attr('src')+'"]').remove();
  return true;

}

/**
 * @name handleDropEventBToA
 * @description Handle a user moves and dropping an image from b_pic to a_pic
 * @param {type} event
 * @param {type} ui
 * @returns {Boolean}
 */
function handleDropEventBToA( event, ui ) {
  var draggable = ui.draggable;
  // Add the image to a_pics
  $("#a_pics").append("<img id=\"dragimg\" src=" + draggable.attr('src') + "></img>");
  // remove the image from b_pics
  $("#b_pics").find('img[src$="'+draggable.attr('src')+'"]').remove();
  return true;

}

/**
 * @name showJsonData
 * @description Show a JSON object with the relevent chosen lollypop and 
 *              include a date and time
 * @returns {undefined}
 */
function showJsonData(){
    // Remove all child elements form the div with id menujson 
    $("#menujson").empty();
    // Create the data string to be used in the JSON object. Also account for leading zeros 
    // and the months starting at zero
    var currentDate = new Date();   
    var finalDate = ""+currentDate.getFullYear()
                    + (("" + (currentDate.getMonth()+1)).length < 2 ? "0" : "") + (currentDate.getMonth()+1)
                    + (("" + currentDate.getDate()).length < 2 ? "0" : "") + currentDate.getDate()+"."
                    +currentDate.getHours()
                    +currentDate.getMinutes();

    var lollypops=[];
    // Add the filename minus the file extention of the images with an id
    // of sortimg to the lollypops array 
    $('img#sortimg').each(function(){
        var index = this.src.lastIndexOf("/") + 1;
        var filename = this.src.substr(index).split(".");
        lollypops.push(filename[0]);
    });
    // Create the JSON object incorperating the version number 
    // and the the lollypops array 
    var finalData = {"version":finalDate,
                      "lollypops":lollypops};
                  
    // Add the JSON object to the div with an id of menujson              
    $("#menujson").append("<pre>"+JSON.stringify(finalData, null, 4)+"</pre>");
}

/**
 * @name Document ready
 * @description When the document is loaded in to the dom add the following 
 *              event on the the relevent ekements using jQuery selectors.
 * @param {type} param
 */
$(document).ready(function() {
    // Add the images to the page
    getImages(); 
    
    // Set up the draggable areas of the page
    $("#dragimg").draggable({ 
        grid: [ 20, 20 ],
        containment: 'document',
        cursor: 'move'});
    
    $("#sortimg").draggable({ 
        grid: [ 20, 20 ],
        containment: 'document',
        cursor: 'move'});
    
    // Set up the sortable areas of the page
    $("#a_pics").sortable({ revert: true });
    $("#b_pics").sortable({ revert: true });
    
    // Set up the droppable areas of the page
    $("#b_pics").droppable({ 
            hoverClass: 'dropped',
            accept: '#dragimg',
            drop: handleDropEventAToB });
  
    $("#a_pics").droppable({ 
            hoverClass: 'dropped',
            accept: '#sortimg',
            drop: handleDropEventBToA });
        
});

