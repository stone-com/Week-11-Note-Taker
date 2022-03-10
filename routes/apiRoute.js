// require express router and fs
const router = require('express').Router();
const fs = require('fs');
// require uuid to generate unique ids on each note
const uuid = require('uuid');


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
// When user wants to save a new note , it will parse the data and add a unique id onto the request body.
router.post('/notes', (req, res) => {
  // read the json notes file and parse it.
  const note = JSON.parse(fs.readFileSync('./db/db.json'));
  // Save the request body to vairiable
  const noteToAdd = req.body;
  // generate  unique ID with uuid4, add it to request body
  noteToAdd.id = uuid.v4();
  // add new note to the json file
  note.push(noteToAdd);
  // write the file
  fs.writeFileSync('./db/db.json', JSON.stringify(note));
  // respond with new file
  res.json(note);
});

// DELETE Request
// when user clicks delete button
router.delete('notes/:id', (req, res) => {
  // read and parse the currrent db file
  const note = JSON.parse(fs.readFileSync('./db/db.json'));
  // filter through the notes for any where the id is not a match
  const filteredNotes = note.filter((remove) => remove.id !== req.params.id);
  // write the new notes 
  fs.writeFileSync('./db/db.json', JSON.stringify(filteredNotes));
  // respond with new json notes
  res.json(filteredNotes);
});


module.exports = router;
