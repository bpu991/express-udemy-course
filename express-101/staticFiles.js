const express = require('express');
const app = express();

//app comes with a use method
// use takes 1 arg: the middleware you want to run
app.use(express.static('public'))


app.listen(3000);