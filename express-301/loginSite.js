const path = require('path');

const express = require('express');
const app = express();

const cookieParser = require('cookie-parser')

const helmet = require('helmet');
const { resolveSoa } = require('dns');

app.use(helmet());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
    if(req.query.msg === 'fail') {
        res.locals.msg = `Sorry. Give me your testicles`
    } else {
        res.locals.msg = ``
    }
    next()
})

app.get('/', (req, res, next) => {
    res.send('Sanity Check')
});

app.get('/login', (req, res, next) => {
    
    res.render('login')
})

app.post('/process_login', (req, res, next) => {
    // req.body is made by urlencoded which parses http

    const username = req.body.username;
    const password = req.body.password

    //check the db to see if user credentials are valid
    //if they are valid...
        // - save their username in a cookie
        // - send them to the welcome page
    
        if(password === 'password') {
            //res.cookie takes name of the cookie and the value to set it to
            res.cookie('username', username);
            res.redirect('/welcome')
        } else {
            res.redirect('/login?msg=fail')
        }
})

app.get('/welcome', (req, res ,next) => {
    //req.cookies will have a property for every named cookie that has been set
    res.render('Welcome', {
        username: req.cookies.username
    })
})

app.get('/logout', (req, res, next) => {
    //res.clearCookie takes in 1 arg: a cookie to clear (by name)
    res.clearCookie('username');
    res.redirect('/login')
})
app.listen(3000)