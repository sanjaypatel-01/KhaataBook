const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) =>  {
    fs.readdir(`./files`, function(err, files){
        // console.log(files);
        res.render("index", {files});
    })
});

app.get("/edit/:filename", (req, res) =>  {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function(err,data){
    if(err) return res.send(err);
    res.render("edit", {data, filename: req.params.filename}); // yahn se aap filename bhi bhejiye, data toh bheja hi hua hai
});
});

app.post("/update/:filename", (req, res) =>  {
    fs.writeFile(`./files/${req.params.filename}`, req.body.filedata, function(err){
    if(err) return res.send(err);
    res.redirect("/"); 
});
});

app.get("/create", (req, res) => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); // Ensures 2 digits for the day
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = today.getFullYear();

    const fn = `${day}-${month}-${year}.txt`;

    fs.writeFile(`./files/${fn}`, "daal cheeni", function(err){
        if(err) return res.send("something went wrong");
        else res.send("done");
    })
});

app.listen(3000); 

// This is just to start the server 
// This starts the server and listens for incoming requests on port 3000
