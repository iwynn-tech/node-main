const express = require('express')
const v1Routes = require('./routes/v1');


const app = express()

// parse json request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
  const name = process.env.NAME || 'World';
  res.send(`Hello ${name}!`);
});

// v1 api routes
app.use('/api/v1', v1Routes);

const port =  8080;
app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});

