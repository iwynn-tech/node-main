const express = require('express')
const v1Routes = require('./routes/v1');
const { getIpAddress } = require('./util/networkUtil');
const axios  = require('axios');

const app = express()

// parse json request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', async(req, res) => {
  try {
    const ipRes = await axios.get('https://api.ipify.org?format=json');

    res.send(`${getIpAddress()} Your Cloud Run's outbound IP address: ${ipRes.data.ip}`);

  } catch (error) {
    console.log(error.message)
    res.send(`error ${error.message}`);

  }
});

// v1 api routes
app.use('/api/v1', v1Routes);

const port =  8080;
app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});

