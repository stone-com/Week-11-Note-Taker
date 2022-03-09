// require express router and path
const router = require('express').Router();
const path = require("path");

// Route for notes page GET request.
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });
// Default route for GET Requests, redirect to index.html homepage
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


// exporting
module.exports = router;
