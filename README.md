#bornReady#

Get your DOM elements ready the moment they are inserted into the document! 

Don't wait for the whole document with your 20 silly script tags to load and delay the DOMContentLoaded event to fire.

Use bornReady 'cause your DOM elements are born ready to do shit!

Based on this: http://www.backalleycoder.com/2012/04/25/i-want-a-damnodeinserted/

###Usage:###
**Insert this script in the HEAD of the document, like so:**

	<script src="bornReady.js"></script>

**If using jQuery:**
	
	$('#selector').bornReady(function(){
		// 'this' refers to '#selector'
		console.log(this.nodeName + ' was just inserted')
		this.style.color = 'red'
	})

**If not using jQuery:**
	
	bornReady({
		'#selector' : detectThis,
		'.classes' : function(){ /*do something with 'this'*/ }	
	})
	
###TODO:###
* Unbind animation listeners after the DOM manipulation upon insertion is done.
* Doesn't work in Opera 
* Some optimizations perhaps
