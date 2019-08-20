const express = require('express');
const bodyParser = require('body-parser');
const LocalStorage = require('node-localstorage').LocalStorage;
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(bodyParser.json());

app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 3000');
});

app.get('/', (req, res) => {

    if (typeof localStorage === "undefined" || localStorage === null) {
        localStorage = new LocalStorage('./scratch');
    }
    res.redirect('/list');
});

app.get('/list', (req, res) => {
    let names = [];
    for (let i =0; i < localStorage.length; i++){
        names.push(localStorage.key(i));
    }
    res.render('list.ejs', {list: names});
});

app.get('/add', (req, res) => {
    res.render('add.ejs', {})
});

app.post('/add', (req, res) => {
    let firstname = req.body.firstname;
    let otherinfo = req.body.firstname +', ' + req.body.lastname + ', ' + req.body.age + ', ' + req.body.birthday;
    localStorage.setItem(firstname, otherinfo);
    res.redirect('/list');
});

app.get('/search', (req, res) => {
    res.render('search.ejs', { })
});

app.post('/search', (req, res) => {
    let firstname = req.body.firstname;
    if (localStorage.getItem(firstname) != null) {
        let otherinfo = localStorage.getItem(firstname);
        res.render('search_result.ejs', {person: otherinfo, firstname: firstname})
    }
    else {
        res.render('search_not_found.ejs', {});
    }
});

app.post('/delete', (req, res) => {
    let firstname = req.body.firstname;
    if (localStorage.getItem(firstname) != null){
        localStorage.removeItem(firstname);
        res.redirect('/list');
    }
});

app.post('/edit', (req,res) => {
    let firstname = req.body.firstname;
    let otherinfo = req.body.firstname +', ' + req.body.lastname + ', ' + req.body.age + ', ' + req.body.birthday;
    if (localStorage.getItem(firstname)!= null) {
        localStorage.setItem(firstname, otherinfo);
    }
    else {
        localStorage.setItem(firstname, otherinfo);
    }
    res.redirect('/list');
});