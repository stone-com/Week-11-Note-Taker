// require express router and fs
const router = require('express').router();
const fs = require('fs');

// GET Request
// when user loads or reloads the page, it will parse the json from the db file so it can be displayed on the page
router.get('/notes', (req, res) => {
  // use readfile to get the json from the db file
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    // respond with the parsed json data
    res.json(JSON.parse(data));
  });
});

// POST Request
// when user saves a note, it will ssave it to db.json file
router.post('/notes', (req, res) => {
  // use readfile to get the json from the db file
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    // parse the json data and save it to a variable
    let parsedJSON = JSON.parse(data);
    // push the new note from the body of the post request to the parsedJSON
    parsedJSON.push(req.body);
    //  use writefile to write the array data to db.json
    fs.writeFile("./db/db.json", JSON.stringify(parsedJSON), (err) => {
        if(err) return err;
        console.log("Success")
    })
  });
});
