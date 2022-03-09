// require express router and fs
const router = require("express").router();
const fs = require("fs");

// GET Request
// when user loads or reloads the page, it will parse the json from the db file so it can be displayed on the page
router.get("/notes", (req,res) => {
    // use readfile to get the json from the db file
    fs.readFile("./db/db.json", "utf8", (err,data) => {
        if (err) throw err;
        // respond with the parsed json data
        res.json(JSON.parse(data));
    });
});