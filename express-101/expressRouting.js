const express = require('express');
const app = express();

// app object has a few methods: get, post, delete, put (these are the HTTP / REST verbs)
// all verbs take 2 args: a path and a callback to run if the request matches the verb

app.get('/', (req, res) => {
    console.log(req);
    res.send(`<h1>Express routing home page </h1>`);
});

app.listen(3000);