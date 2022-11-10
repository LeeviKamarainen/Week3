var express = require('express');
var router = express.Router();

/* GET home page. */
let alluserData = [];

router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Todos' });
});

router.post('/todo', function(req,res) {
  let userData = req.body;
  console.log(userData)

});

module.exports = router;
