const express = require('express');
const router = express.Router();
const request = require("request");
const config = require("../util");

router.get('/', function(req, res, next) {
  res.json([{
  	id: 1,
  	username: "samsepi0l"
  }, {
  	id: 2,
  	username: "D0loresH4ze"
  }]);
});

router.get('/search', (req, res, next) => {
  var options = { method: 'POST',
    url: config.UNIPOS_URL,
    headers: 
     { 'postman-token': '62ae5ee0-a33d-e96c-fc73-422af473e9fa',
       'cache-control': 'no-cache',
       'content-type': 'application/json',
       'x-unipos-token': '35b28202-2f29-4b7d-897d-9c2befc6fd6b' },
    body: 
     { jsonrpc: '2.0',
       method: 'Unipos.FindSuggestMembers',
       params: { term: req.query.q, limit: 100 },
       id: 'Unipos.FindSuggestMembers' },
    json: true };
  
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      res.send({ result: body.result})
    });  
});

router.get('/profile', (req, res) => {
  if(!req.headers["x-unipos-token"]) {
    req.send({message: 'No token provided'})
  }
  const options = { 
    method: 'POST',
    url: config.UNIPOS_URL,
    headers: { 
     'cache-control': 'no-cache',
     'x-unipos-token': req.headers["x-unipos-token"],
     'content-type': 'application/json' 
    },
    body: { 
      jsonrpc: '2.0',
      method: 'Unipos.GetProfile',
      params: [],
      id: 'Unipos.GetProfile' 
    },
      json: true 
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.send({ result: body.result })
  });
})

router.post('/message', (req, res, next) => {
  if(!req.body.userFrom) {
    res.send({ code: 500, message: 'Who are you ?'}) 
  }

  if(!req.body.userTo) {
    res.send({ code: 500, message: 'Send to whom ?'}) 
  }

  if(!req.body.points) {
    res.send({ code: 500, message: 'How many points ?'}) 
  }

  const bodyMessage = JSON.stringify({
    'jsonrpc': `2.0`,
    'method': config.SEND_MESSAGE,
    'params': {
      'from_member_id' : req.body.userFrom,
      'to_member_id' : req.body.userTo,
      'point' : parseInt(req.body.points),
      "message": req.body.messages
    },
    'id' : config.SEND_MESSAGE,
    'method' : config.SEND_MESSAGE
  });

  const options = { 
    method: 'POST',
    url: config.UNIPOST_SENDPOINT_URL,
    headers: { 
      'postman-token': '31da3255-d6c9-4aa3-5c31-c66b83dcc5b3',
      'cache-control': 'no-cache',
      'x-unipos-token': req.headers["x-unipos-token"],
      'content-type': 'application/json' 
    },
    body: bodyMessage
  };

  // request(options, function (error, response) {
  //   if (error) throw new Error(error);

  //   res.send({ code: 200, message: 'Success'})
  // });
});

module.exports = router;