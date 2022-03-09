// require express router and fs
const router = require('express').router();
const { parsedJSON } = require('express');
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
    fs.writeFile('./db/db.json', JSON.stringify(parsedJSON), (err) => {
      if (err) return err;
      console.log('Successfully added');
    });
  });
  //   end the response
  res.end();
});

// DELETE Request
// User deletes a note and updates JSON data
router.delete('/notes/:id', (req, res) => {
  // get id from req.params.id and store as variable
  let id = req.params.id;

  // use readfile to get the json from the db file
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    // Throw error code of there was issue reading db.json
    if (err) throw err;
    // parse the json data and save it to a variable
    let parsedJSON = JSON.parse(data);
    // Loop through parsedJSON and look for matching ID's
    for (let i = 0; i < parsedJSON.length; i++) {
      //   if there is a match, use splice array method to remove it
      if (id == parsedJSON[i].id) {
        parsedJSON.splice(i, 1);
        //  use writefile to overwrite the array data to db.json with the updated version
        fs.writeFile('./db/db.json', JSON.stringify(parsedJSON), (err) => {
          if (err) throw err;
          // log "note deleted" to console/terminal
          console.log('successfully deleted');
        });
      }
    }
  });

  // end the response
  res.end();
});
// export
module.exports = router;
