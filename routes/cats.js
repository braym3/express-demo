const router = require(`express`).Router(); // create a router, import express
// Encapsulate routes together - creating router, giving it a bunch of routes & exporting it (declutter index)

const cats = []; // saving cats to list - no persistence

// Read
router.get(`/getAll`, (req,res)=>{ // get request - path & callback(req, res)
    res.json(cats)
}); 

// Create
router.post(`/create`, (req, res)=>{
    const newCat = req.body;
    cats.push(newCat);

    res.status(201).json(cats[cats.length-1]); // set 201 created status and return latest cat
});

// Delete
router.delete(`/remove/:id`, (req, res)=>{ // sets variable as part of path
    const{id} = req.params; // destructuring id from params
    const removed = cats.splice(id, 1); // index & num of elements to delete - returns deleted element
    res.json(removed);
});

// Update
router.patch(`/update/:id`, (req, res, next)=>{
    const{id} = req.params;

    // check if id is correct
    if(id >= cats.length){ // checks if id is out of bounds
        return next({ msg: `ID out of bounds`, status: 404}); // returns next with object of message & status code
    }

    const{name} = req.query; // get query params
    const catToUpdate = cats[id]; // get cat to update
    catToUpdate.name = name; // set name to updated value
    res.json(catToUpdate); // return updated cat
});

module.exports = router; // export router from the file