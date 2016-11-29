
# SharkByte
___
It's time for a better way to dive into web design. Get your feet wet with SharkByte, an interactive, realtime collaborative tool for making static web pages, or building resources to include in larger projects.

### URL: [sharkbyte.herokuapp.com](https://sharkbyte.herokuapp.com)
#### Demo Login
**Username:** admin

**Password:** password

### Screenshots
___
Code Preview (Cage) Page 
![Cage](http://i.imgur.com/AZvtm9e.png)

Home Page

![Index](http://i.imgur.com/Y0yUMS2.png)

User's Profile Page

![Profile](http://i.imgur.com/C9uWaX2.png)

### Features
* Users can write HTML, CSS, and JavaScript
* User input code is rendered in real time, with previews for desktop, and both mobile orientations
* Code is persisted to the user's account when saved
* Code can be exported to a web-ready file for static pages
* Projects can be kept private or made public to be shared with other users - invite your friends!


### Technologies Used
* HTML
	* General site content
* CSS, SASS, Materalize
	* Site Styling 	
* JavaScript, AJAX, jQuery
	* Functionality of user interaction with site 	 
* NodeJS
	* Back end, chosen over Rails because SharkByte relies on real-time interaction with the user and original plans included using Sessions.io 	
* Express
	* Streamline routing 	 
* Passport
	* Assists with user setup, securing passwords 
* MongoDB
	* Storage to persist users, cages, and cage's HTML/CSS
* Mongoose
	* Streamlines interaction with database
* EJS
	* Inline JavaScript, used to dynamically incorporate server-side data into files sent to the client
* Firebase
	* NoSQL Database as a service, utilized by Firepad
* Firepad API
	* Handles collaboration in text-editors 
* ACE Pad API
	* Code IDE/Editor with simple autocomplete, error warnings, and syntax highlighting 

## Code Examples
___

```JavaScript
//checkPermission is a custom middleware that checks to make sure the user
// is logged in when they attempt to access a protected route

module.exports.checkPermission = function(req, res, next){
  if (req.user){
  	 //update the app's user (maintains state)
    req.app.locals.user = req.user;
    next();
  }
  else{
    req.flash('error','You need to login first to access that page!');
    res.redirect('/');
  }
};
```

```Javascript
//debounce is a helper function I wrote that limits the frequency another
//function, such as one fired by an event, can be called. I used it to 
//limit the number of reads/writes to the preview as the user inputs code

function debounce(fn, delay) {
                var timer = null;
                return function() {
                    var context = this,
                        args = arguments;
                    clearTimeout(timer);
                    timer = setTimeout(function() {
                        fn.apply(context, args);
                    }, delay);
                };
            }
```

### Future Work
___
* Integrate GitHub, so users can import/export files between SharkByte and GitHub
* Add support for compiled languages - Haml, SASS, Jade, Coffeescript, etc
* Resizable windows for code input
* Add a page where cages can be displayed and viewed by users
