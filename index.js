const express = require("express");
const app = express();
const port = 3000;

app.set('view engine', 'ejs'); // telling express to use EJS as the templating engine when rendering views

app.listen(port, () => {

    console.log(`Jose listening on : ${port}`)

})