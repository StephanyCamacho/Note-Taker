const fs = require("fs")
const path = require("path");

var noteData;

module.exports = function (app) {
    fs.readFile("./db/db.json", "utf8", function (err, data) {
        if (err) throw err;
        noteData = JSON.parse(data);
    })

    app.get("/api/notes", function (req, res) {
        // console.log('in get')
        // console.log(noteData)
        res.json(noteData);
    });


    app.post("/api/notes", function (req, res) {
        var newNote = req.body;
        noteData.push(newNote);
        let parsedata = JSON.stringify(newNote)
        fs.writeFile(path.join(__dirname, '../db/db.json'), parsedata, (err) => {
            if (err) throw err;
            console.log("Delete success");
        })
        // console.log(noteData);
        res.json(noteData);
    });

    app.delete("/api/notes/:title", function (req, res) {
        // console.log(req.body)
        var deleteData = req.params.title
        // console.log(deleteData)
        console.log(deleteData)
        for (i=0; i<noteData.length; i++) {
            // console.log(noteData[i])
            if (deleteData === noteData[i].title) {
                noteData.splice(i, 1)
            };
        };
        let parsedata = JSON.stringify(noteData)
        fs.writeFile(path.join(__dirname, '../db/db.json'), parsedata, (err) => {
           if (err) throw err;
           console.log("Delete success");
       })
        console.log(noteData)
        res.json(noteData)
    })