const express = require("express");
const app = express(); // creates an app
app.use(express.json()); // use body parser that comes with express - express.json is middleware that parses the body to json

const cats = []; // saving cats to list - no persistence

// Read
app.get(`/getAll`, (req,res)=>{ // get request - path & callback(req, res)
    res.json(cats)
}); 

// Create
app.post(`/create`, (req, res)=>{
    const newCat = req.body;
    cats.push(newCat);

    res.status(201).json(cats[cats.length-1]); // set 201 created status and return latest cat
});

// Delete
app.delete(`/remove/:id`, (req, res)=>{ // sets variable as part of path
    const{id} = req.params; // destructuring id from params
    const removed = cats.splice(id, 1); // index & num of elements to delete - returns deleted element
    res.json(removed);
})

// Update
app.patch(`/update/:id`, (req, res)=>{
    const{id} = req.params;
    const{name} = req.query; // get query params
    const catToUpdate = cats[id]; // get cat to update
    catToUpdate.name = name; // set name to updated value
    res.json(catToUpdate); // return updated cat
})


const server = app.listen(
    4494,
    ()=>console.log(`server started on `, server.address().port)); // starts the server on whatever port you give it - callback function tells you its started


