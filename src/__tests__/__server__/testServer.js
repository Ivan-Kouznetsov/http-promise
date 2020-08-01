const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.raw({ type: '*/*' }));

const port = 3030;

const posts = ['0th Post'];

app.get('/', (_, response) => {
  response.status(200).send('Ready').end();
});

app.get('/null', (_, response) => {
  response
    .status(200)
    .send(JSON.stringify({ id: null, text: undefined }))
    .end();
});

app.get('/posts/:id', (request, response) => {
  const id = parseInt(request.params['id']);

  if (typeof posts[id] !== 'undefined') {
    console.log(JSON.stringify({ id, text: posts[id] }));
    response.send(JSON.stringify({ id, text: posts[id] })).end();
  } else {
    response.status(404).send('Not Found').end();
  }
});

app.get('/lastpost', (_, response) => {
  console.log(JSON.stringify({ id: posts.length - 1, text: posts[posts.length - 1] }));
  response.send(JSON.stringify({ id: posts.length - 1, text: posts[posts.length - 1] })).end();
});

app.post('/posts', (request, response) => {
  console.log(request.body.toString());
  posts.push(request.body.toString());

  response.send(JSON.stringify({ id: posts.length - 1, success: true }));
});

app.listen(port, (err) => {
  if (err) {
    console.error('Error:', err);
  }
  console.log(`listening on port ${port}`);
});
