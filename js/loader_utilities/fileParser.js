/*
* fileParser.js : This service is responsible to fetch file URLs from fileManager.js. 
*                 Change in file URLs does not affect teh controllers/services/Factories/Directives
*                 Dynamic file loading.  
*                 New Files (CSS, JS) can be added at fileManager.js before Execution
*                 fileManager.js located @ js\utilities\fileManager.js which contains URLs as an object.
*/

'use strict';

/*** Plain Javascript used as to support all browsers before parsing the dependencies ***/
(function(){
    var fileParser,
        fileUrl,
        responseText,
        filesArray,
        scriptFileArray, 
        stylesheetFileArray, 
        headDOM,
        link,
        bodyDOM,
        timestamp,
        isoTimestamp;

/*** Make Async call to fetch all files ***/
if (window.XMLHttpRequest) {
    fileParser = new XMLHttpRequest();
} else {
    fileParser = new ActiveXObject("Microsoft.XMLHTTP");
}

/*** URL of file Manager ***/
fileUrl = "js/loader_utilities/fileManager.js";
fileParser.open("GET", fileUrl, false);
fileParser.send();
responseText = fileParser.responseText;

/*** Acquire File URLs to be Laoded at runtime ***/
filesArray = JSON.parse(responseText);

/*** Segregate File Types ***/
scriptFileArray = filesArray.files[0].script;
stylesheetFileArray = filesArray.files[1].stylesheet;

headDOM = document.getElementsByTagName('head')[0];

/*** Bind Stylesheets to Document ***/
for (var i = 0; i < stylesheetFileArray.length; i++) {
    link = document.createElement('link');
    link.href = stylesheetFileArray[i].fileName;
    link.rel = "stylesheet";
    link.type = "text/css";
    link.id = stylesheetFileArray[i].id;
    headDOM.appendChild(link);
}
isoTimestamp = 0;
//timestamp = new Date();
//isoTimestamp  = timestamp.toISOString();
/*** Bind Scripts to Document ***/
for (var i = 0; i < scriptFileArray.length; i++) {
    document.write("<script type = \"text/javascript\" src=" + scriptFileArray[i].fileName + "?timestamp="+isoTimestamp+"  id = " + scriptFileArray[i].id + "></script>");
}
bodyDOM = document.getElementsByTagName('body')[0];

//bodyDOM.style.display = "none";
setTimeout(function() {
    //bodyDOM.style.display = "block";
}, 100);

})();