const express = require("express"); // loading express module 
const app = express(); // creating an instance express
const port = 3000; // server on port 3000

app.use(express.urlencoded({ extended: true })); // middleware that parses URL-encoded form data
// cannot form data from POST requests without it, req.body would be undefinded 

app.set('view engine', 'ejs'); // telling express to use EJS as the templating engine when rendering views
// when im calling res.render(), it looks for .ejs files in the views/ folder and fills in dynamic content

app.listen(port, () => { // starts the server and listens for request on localhost:3000

    console.log(`Jose listening on : ${port}`)

})

app.get('/', (req, res) => { // get route for the homepage 
    res.render('home'); // when you visit /, it renders views/home.ejs
});

app.get('/about', (req, res) => { // get route for the about page
    res.render('about'); // when you visit /about it renders the views/home.ejs
});

app.get('/user/:name', (req, res) => { // when visiting /user/Jose, req.params.name becomes 'Jose', and its passed into user.ejs as {name: 'Jose'}
    const userName = req.params.name; // req.params is an object that holds all the values from the : parameters in the URL.
    //So if they went to /user/Jose, req.params.name will be 'Jose'
    res.render('user', { name: userName }); //The : means "this part is dynamic."

});

app.post('/submit', (req, res) => { // POST route that recieves the form data
    console.log(req.body);   // Logs { name: 'whatever you typed' }
    res.send('Success! Form received.'); // responds with a success message
});

