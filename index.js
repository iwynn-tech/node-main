const express = require('express')
const app = express()
const port = parseInt(process.env.PORT) || 8080;
// const routes = require('./routes/v1');


// parse json request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// v1 api routes
// app.use('/v1', routes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

