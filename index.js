const express = require(`express`);
const app = express(); // creates an app - don't write anything else above this
app.use(express.json()); // use body parser that comes with express - express.json is middleware that parses the body to json
require(`./db`) // import db file

// logger
const logger = (req, res, next)=>{  
    console.log(`Host: `, req.host);
    console.log(`Method: `, req.method);
    console.log(`Path: `, req.path);
    return next(); // uses next to call next function in the chain - as it doesnt send a response
};
app.use(logger); // how you use middleware in the express app - no path (always runs - runs every time you call it)

const catRoutes = require(`./routes/cats`); // import routes
app.use(`/cats`, catRoutes) // add the routes to the app - puts '/cats' before all urls in the routes (e.g./cats/getAll)

// Error handling middleware
app.use((err, req, res, next)=>{
    res.status(err.status).send(err.msg);
});

// don't write anything below this
const server = app.listen(
    4494,
    ()=>console.log(`server started on `, server.address().port)); // starts the server on whatever port you give it - callback function tells you its started


