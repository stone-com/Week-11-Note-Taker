// require express router
const router = require("express").Router();

// Default route for GET Requests, redirect to index.html homepage
router.get("*",(req,res) => {
    res.sendFile(path.join(__dirname, "../public.index.html"));
});

// Route for notes page GET request.
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});