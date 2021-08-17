// Imports 
const express = require('express')
const app = express()
const port = 3000

// Time Middleware
const verifyTime = (req, res, next) => {
    let time = new Date();
    if (
    time.getDay() <= 5 &&
    time.getDay() >= 1 &&
    time.getHours() <= 18 &&
    time.getHours() >= 9
    )  {   console.log("We are open");
        next();      } 
    else 
    console.log("We are closed");
        res.send('closed'), { time: time.toUTCString() }        
};

// Static Files
app.use(express.static('public'));

// Public folder
app.use('/css', express.static(__dirname + 'public/css'))

// Set views
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('', verifyTime,(req, res) =>{
    res.render(__dirname + '/views/index.ejs')
})

app.get('/index',verifyTime, (req, res) =>{
    res.render(__dirname + '/views/index.ejs')
})

app.get('/services',verifyTime, (req, res) => {
    res.render(__dirname + '/views/services.ejs')
})

app.get('/about', verifyTime,(req, res) => {
    res.render(__dirname + '/views/about.ejs')
})

app.get('/contact',verifyTime, (req, res) => {
    res.render(__dirname + '/views/contact.ejs')
})

// Listen on port 3000
app.listen(port, () => console.log(`App listening on port ${port}`))

