// Encapsulate routes together - creating router, giving it a bunch of routes & exporting it (declutter index)
const router = require(`express`).Router(); // create a router, import express
const {catModel} = require(`../db`); // import model

const cats = []; // saving cats to list - no persistence

// Read
router.get(`/getAll`, async (req, res, next)=>{ // get request - path & callback(req, res)
    try{
        res.json(await catModel.find({})); // return find all
    }catch(err){
        return next({status: 500, msg: `Oops!`});
    }
}); 

// Create
router.post(`/create`, async ({body}, res, next)=>{ // destructure out the body (req.body)
    try{
        const created = await catModel.create(body); // create cat using request body
        res.status(201).json(created); // set 201 created status and return created cat
    }catch(err){
        return next({status: 500, msg: `Oops!`});
    }
});

// Delete
router.delete(`/remove/:id`, async (req, res, next)=>{ // sets variable as part of path
    try{
        const {id} = req.params; // destructuring id by params
        res.json(await catModel.findByIdAndDelete(id)); // delete cat by id and return deleted cat
    }catch(err){
        return next({status: 500, msg: `Oops!`});
    }
});

// Update
router.patch(`/update/:id`, async (req, res, next)=>{
    try{
        const {id} = req.params; // destructuring id by params

        // check if id is correct
        if(id >= cats.length){ // checks if id is out of bounds
            return next({ msg: `ID out of bounds`, status: 404}); // returns next with object of message & status code
        }

        const updatedCat = await catModel.findByIdAndUpdate(id, req.query, {returnDocument: `after`}) // update by id using query params
        res.json(updatedCat); // return updated cat
    }catch(err){
        return next({status: 500, msg: `Oops!`});
    }
});

module.exports = router; // export router from the file