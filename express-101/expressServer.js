const path = require('path');
const express = require('express');
const app = express();


app.use(express.static('public'))
// all is a method that takes 2 args: route and callback 
// to run if the route is requested

app.all('/', (req, res) => {
    //express handles the basic headers (status code, mime-type)
    //express does not handle the body so you still have to write that
    res.sendFile(path.join(__dirname + '/node.html'));
    // res.send(`<h1>This is the homepage </h1>`)

    //express handles the end 
});

app.all('*', (req, res) => {
    res.send('<h1>Wrong page </h1>')
})

app.listen(3000)