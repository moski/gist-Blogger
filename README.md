<center><small>A simple way to embed gist into Blogger's dynamic view. By [Moski Doski](http://moski.me).</small></center>

## Usage

At the end of each of your blog posts, include the following code using the HTML editor:

    <script src="https://cdn.rawgit.com/moski/gist-Blogger/master/public/gistLoader.js" type="text/javascript"></script>

Now to include any gist template just add the following anywhere in your blog post.

	<div class="gistLoad" data-id="GistID" id="gist-GistID">Loading ....</div>

Replace "GistID" with your gist id.

Optionally, you can specify a file to be loaded if your gist contains multiple files using the data-file attribute, like this:

	<div class="gistLoad" data-id="GistID" data-file="YourFileName.extension" id="gist-GistID">Loading ....</div><br />

Example:

	<div class="gistLoad" data-id="4982341" data-file="gistfile2.cs" id="gist-4982341">Loading ....</div><br />


## Development

If you want to work with this script locally. You need to clone the repo using 

	git clone git@github.com:moski/gist-Blogger.git

To start up the server, just run
	
	rackup
	
Now, to use the local version of the script, change the script embed code in your post to the local version

	<script src="http://localhost:9292/gistLoader.js" type="text/javascript"></script>

You also need to change the main script path inside (gistLoader.js)

	//var gistBloggerPath = "https://raw.github.com/moski/gist-Blogger/master/public/gistBlogger.js";
	var gistBloggerPath = "http://localhost:9292/gistBlogger.js";

That's it, now blogger will start calling your script.


## Thanks

* [Alex Conrad](http://www.alexconrad.org/2011/12/highlight-code-with-bloggers-dynamic.html)
* [kares](https://github.com/kares/script.js) for the scripts loading idea.
