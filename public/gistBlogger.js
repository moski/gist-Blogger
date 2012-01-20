(function () {
  
  // Turn on/off the logging syste,
  var LOG = false 

  // a list of scripts to load
  var scripts = []; 

  // Writes contains the data coming from each document.write.
  var writes = null;
  var docWrite, docWriteln; // original document.write / writeln
  var tempDocWriteln = function(str) { tempDocWrite(str + '\n'); };


  function tempDocWrite(){
    var args = arguments;

    if ( args && args[0] ) {
      LOG && console.log('document.write() args[0] = ', args[0]);
      if ( ! writes ) writes = [];
      writes.push( args[0] );
    }else {
      LOG && console.log('document.write() unexpected args = ', args);
    }
  }  

  // Override the Document.write function to use the tempDocWriteln.
  function overrideDocWrites() {
      if (!docWrite) docWrite = document.write;
      if (!docWriteln) docWriteln = document.writeln;
      document.write = tempDocWrite;
      document.writeln = tempDocWriteln;
  }

  // Revert the Document.write function to the original.
  function restoreDocWrites() {
    if ( docWrite ) document.write = docWrite;
    if ( docWriteln ) document.writeln = docWriteln;
    docWrite = null; docWriteln = null;
  }

  // Given the gist ID, generate the JS path.
  function generatePath(id){
    return "https://gist.github.com/" + id + ".js"
  }



  // load the next "script" and invoke callback when done
  function loadScript(currentScript, yieldDone){
    var id   = currentScript.data('id');
    var path = generatePath(id)
    LOG && console.log("loadScript() id =" + id + "  path=" + path);

    var el;
    el = window.document.createElement('script');
    el.setAttribute('src',path);

    // Callback when the script been loaded to the DOM.
    var handleScriptLoaded = function() {
      // document.write happened
      if (writes) {
        LOG && console.log('handleScriptLoaded() writeArray.len = ', writes.length);
        currentScript.html('<br/>' + writes.join(''));
      }
    }

    el.onload = function() {
      LOG && console.log("finished loading the script")
      try {
        handleScriptLoaded();
      }
      finally{yieldDone && yieldDone()}
    }

    // append the child and force the onload event.
    window.document.body.appendChild(el);
  }


  function loadScripts(){
    LOG && console.log("loadScripts() " + (scripts.loading));

    if (!scripts || scripts.loading) return; // already loading
    scripts.loading = true;
    
    (function loadNext() {
      
      // Break the recursive loop of loading all the scripts.
      if (!scripts.length){
        delete scripts.loading;
        return;
      }
      
      
      // Find the Gist script ID we need to load.
      var $currentScript = scripts.shift();
      
      if ($currentScript) {
        LOG && console.log('loadNext() overriding writes ...');
        
        // override the document.write function to write to a buffer instead
        // of a document.
        overrideDocWrites();writes = null;
        
        // Load this script and when its done revert the document.write.
        loadScript($currentScript, function(){
            // clear for next
            restoreDocWrites(); writes = null; 
            
            // load the next script if there is any.
            loadNext();
        });       
      }
      // maybe there's a hole in the list
      else { 
        loadNext();
      }
    })();
  }

  /** Init Gists **/
  function initGist(){
    LOG && console.log("initGist()")
    $('.gistLoad').each(function(index){
      LOG && console.log("Adding -" + $(this).data("id") + "- to scripts array")
      scripts.push($(this))
    });
    loadScripts(); // safely callable multiple times
  }
  

  window['initGist'] = initGist;
})();