const express = require('express');
const path = require('path')
const app = express();
const helmet = require('helmet');
app.use(helmet());

//serve up static files
app.use(express.static('public'));

//parse json and urlencoded data into req.body
app.use(express.json());
app.use(express.urlencoded());


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req,res, next) => {
    res.render('index')
})

app.listen(3000)
