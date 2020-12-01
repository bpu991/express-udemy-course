const express = require('express');
const app = express();

//Express is 2 things: a router and series of middleware that comprises a web framework
// a middleware function is any func that has access to the req, res, next object
// Before middleware = Req ---> Res
// With middleware = Req --> Middleware --> Res

// With middleware = Req --> Middleware --> Res
//1. Request comes in
//2. We need to validate the user
//3. We need to store something in the database
//4. If there is data from the user, we need to parse it and store it
//5. Res

function validateUser(req, res, next) {
    //get info out of the req object
    //do some stuff with the db
    res.locals.validated = true;
    console.log("Validated Ran")
    next()
}

//this will run validate user on all paths and methods
app.use(validateUser)

//this will run VU on /admin, all methods
app.use('/admin', validateUser)

//this will run VU on /, only on get methods
app.get('/', validateUser)

app.get('/', (req, res, next) => {
    res.send('<h1>main page </h1>')
    console.log(res.locals.validated)
});
app.get('/admin', (req, res, next) => {
    res.send('<h1>admin page </h1>')
    console.log(res.locals.validated)
});

app.listen(3000);