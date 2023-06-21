const bodyParser = require('body-parser');
const ejs = require('ejs')
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

let newItem = [];
let workItem = [];

let options = {
  weekday: 'long',
  day: 'numeric',
  month: 'long'
}

const date = new Date();
let day = date.toLocaleDateString('id-ID', options);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('lists', {nameList: day, newAddItem: newItem})
});

app.get('/work', (req, res) => {
  res.render('lists', {nameList: "Work", newAddItem: workItem})
})

app.post('/', (req, res) => {
  let item = req.body.newItem;
  let btnValue = req.body.button;
  if(btnValue == day){
    newItem.push(item);
    res.redirect('/')
  } else{
    workItem.push(item)
    res.redirect('/work')
  }
});

app.listen(process.env.PORT || 3000, (err) => {
  if(err) throw err;
  console.log('It is RUNNING in 3000')
});