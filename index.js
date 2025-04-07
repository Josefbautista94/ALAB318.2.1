const express = require("express"); // loading express module 
const app = express(); // creating an instance of the Express app
const port = 3000; // setting the server to run on port 3000

app.use(express.urlencoded({ extended: true }));
// middleware that parses URL-encoded form data from POST requests
// without this, req.body would be undefined

app.use(express.static("public")) // Any file in /public can be accessed by its filename directly in the browser

// creating my own middleware for practice (Logger)
app.use((req, res, next) => {
    // app.use registers the middleware — it runs on every request to the server
    // req = incoming request, res = outgoing response, next = tells Express to move to the next step

    const time = new Date().toLocaleString(); // creates a human-readable timestamp
    const method = req.method; // stores the HTTP method (GET, POST, etc.)
    const url = req.url; // gets the request path, like /user/Jose

    console.log(`[${time}] ${method} ${url}`);
    // logs something like: [4/5/2025, 2:17:41 AM] POST /submit

    next(); // moves to the next middleware or route
});

app.set('view engine', 'ejs');
// sets EJS as the templating engine
// when calling res.render(), Express looks for .ejs files in the views/ folder and injects dynamic data

app.listen(port, () => {
    // starts the server and listens for requests on localhost:3000
    console.log(`Jose listening on : ${port}`);
});

app.get('/', (req, res) => {
    // GET route for the homepage 
    res.render('home'); // renders views/home.ejs
});

app.get('/about', (req, res) => {
    // GET route for the about page
    res.render('about'); // renders views/about.ejs
});

app.get('/user/:name', (req, res) => {
    // Dynamic route with a URL parameter
    // Visiting /user/Jose sets req.params.name to 'Jose'
    const userName = req.params.name;
    res.render('user', { name: userName });
    // Renders views/user.ejs and passes in { name: 'Jose' }
});

app.get("/download", (req, res) => { 
    // When someone visits this endpoint, this function runs
  
    res.download(__dirname + '/public/Megaman_retro_3D_by_cezkid.webp', '8bitMegaMan.webp'); 
    
    // res.download is a built-in Express method that tells the browser:
    // “Instead of displaying this file, download it.”
  
    // __dirname is a global Node variable that gives the full path to the current directory.
    // Adding + '/public/Megaman_retro_3D_by_cezkid.webp' points to the exact file inside your public/ folder.
  
    // '8bitMegaMan.webp' is the name the file will be saved as when downloaded,
    // instead of using the original filename.
  });
  

app.post('/submit', (req, res) => {
    // POST route that receives form data
    console.log(req.body);   // Logs { name: 'whatever you typed' }
    res.send('Success! Form received.'); // Sends confirmation message
});
