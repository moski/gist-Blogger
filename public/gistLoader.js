(function() {
    
    var gistBloggerPath = "https://raw.github.com/moski/gist-Blogger/master/public/gistBlogger.js";

    // Initialize the load the main script.
    try {
        initGist();
    } catch(e) {
        var scriptId = 'gistPrinter';
        if (document.getElementById(scriptId) === null) {
            var elem = document.createElement('SCRIPT');
            elem.id = scriptId;
            elem.onload = function() {
              initGist();
            }
            elem.src = gistBloggerPath;
            var theBody = document.getElementsByTagName('body')[0];
            theBody.appendChild(elem);
        }
    }
})();