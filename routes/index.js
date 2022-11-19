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
  let userIndex;
  for (let index = 0; index < alluserData.length; index++) {
    console.log(userData)
    if(alluserData[index].name == userData){
      console.log('Found user')
      userIndex = index;
      userfound = 1;
      break
    }
  }
  if(userfound==0) {
    res.json('User not found')
  } else {
    res.json(alluserData[userIndex])
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
      res.json('User deleted')
      userfound = 1;
      break
    }
  }
  if(userData==0) {
    res.json('User not found')
  }
});

router.put('/user', function(req,res,next) {
  let userData = req.body;
  let todoFound = 0;
  for (let index = 0; index < alluserData.length; index++) {
    if(alluserData[index].name == userData.name){
      for (let j = 0; j < alluserData[index].todos.length; j++) {
        if(alluserData[index].todos[j] == userData.todo) {
          alluserData[index].todos.splice(j,1);
          todoFound = 1;
        }
      }
    }
  }
  if (todoFound==0) {
    res.json('User not found')
  }
  else {
    res.json('Task deleted')
  }
})



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
    res.json('Todo added')
  } else{
    alluserData.push(req.body)
    res.json('User added')
  }
});

module.exports = router;
