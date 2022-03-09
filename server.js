// require express and the two route files
const express = require('express');
const apiRoute = requrie('./routes/apiRoute');
const htmlRoute = require('./routes/htmlRoute');

// Create express Server
const app = express();

// Set up Port variable
const PORT = process.env.PORT || 3001;

// MiddleWare
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to the two external route files, htmlRoute and apiRoute.
app.use("/api",apiRoute);
app.use("/",htmlRoute);

// use listen to start the server
app.listen(PORT, () => {
    console.log(`Server started! Listening on PORT:${PORT}`)
})