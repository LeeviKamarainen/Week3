var express = require('express');
var router = express.Router();

/* GET home page. */
let alluserData = [];

router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Todos' });
});

router.get('/user/:id', function(req, res, next) {
  let userData = req.params.id;
  let userfound = 0;
  for (let index = 0; index < alluserData.length; index++) {
    console.log(userData)
    if(alluserData[index].name == userData){
      console.log('Found user')
      res.json(alluserData[index])
      userfound = 1;
      break
    }
  }
  if(userData==0) {
  res.json('User not found')
  }
});

router.delete('/user/:id', function(req, res, next) {
  let userData = req.params.id;
  let userfound = 0;
  for (let index = 0; index < alluserData.length; index++) {
    console.log(userData)
    if(alluserData[index].name == userData){
      console.log('Deleted user')
      console.log('Remaining: '+alluserData)
      alluserData.splice(index,1)
      res.json('Deleted user')
      userfound = 1;
      break
    }
  }
  if(userData==0) {
  res.json('User not found')
  }
});


router.post('/todo', function(req,res) {
  let userData = req.body;
  let userfound = 0;
  let userindex;
  for (let index = 0; index < alluserData.length; index++) {
    if(alluserData[index].name == userData.name){
      userfound = 1;
      userindex = index;
      break
    }
  }
  if(userfound == 1) {
    alluserData[userindex].todos.push(userData.todos[0])
    res.send('Todo added')
  } else{
    
    console.log('Täällä 2')
    alluserData.push(req.body)
    res.send('User added')
  }
});

module.exports = router;
