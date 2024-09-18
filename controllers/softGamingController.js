const { default: axios } = require("axios");
const { db } = require("../config/firebase");
const crypto = require('crypto');
const moment = require("moment");
require('dotenv').config();  // Load environment variables from .env

const fundistUrl = `${process.env.FUNDIST_URL}/System/Api/${process.env.FUNDIST_API}`
const casinoServerIp = process.env.GOOGLE_STATIC_IP
const tid = moment().unix().valueOf()+Math.floor(Math.random() * 10);;
const pwd = process.env.FUNDIST_PASSWORD
const key = process.env.FUNDIST_API

// Function to generate MD5 hash
function generateHash(endpoint, tid) {
  const hashData = `${endpoint}/${casinoServerIp}/${tid}/${key}/${pwd}`;
  // console.log(hashData,'hash inside generator')
  return crypto.createHash('md5').update(hashData).digest('hex');
}

const callback = async (req, res) => {
  
  return res.status(200).json({status:true,message:'No longer using this endpoint'})
    // db.collection('callback').add({type:'softgaming',...req.body})
    // .then((e)=> res.status(200).json({ status: true,message:e.id }))
    // .catch((e)=>res.status(400).json({status:false,message:e.message}))
  };

  const authentication = async(req,res)=>{

    try {
      console.log(req.body,'ini bodynya..')
      const base = Object.assign({}, req.body);
      delete base.hmac;
      if ('actions' in base) {
      let actions = '';
      for (const action of base.actions) {
              Object.keys(action).sort().forEach(key => actions += action[key]);
          }
          base.actions = actions;
      }
      const hash = crypto.createHash('sha256');
      const hmac = crypto.createHmac('sha256', hash.update(process.env.FUNDST_HMAC).digest('buffer'));
      let hmacBase = '';
      Object.keys(base).sort().forEach(key => hmacBase += base[key]);
      const hmacString = hmac.update(hmacBase).digest('hex');

      const result = await axios.post(process.env.FUNDIST_URL,{})
      console.log(result,'ini resultnya')


      res.status(200).json({ status: true,data:result })
    } catch (error) {
      console.log(error.message)
      res.status(400).json({ status: false,message:error.message })

    }
   
  }

  const gameCatalog = async(req,res)=>{
    console.log('running game catalog')
    try {
      const result = await axios.get(`https://apitest.fundist.org/System/Api/${process.env.FUNDIST_API}/Game/FullList?TID=${moment().unix()}&Hash=${123123123123}.`)
      console.log(result.data,'ini datanya')

      res.send({status:true,data:result.data})
    } catch (error) {
    console.log(error.message)  
    res.send({status:false,message:error.message})
    }
  }

  const gameCategory = async(req,res)=>{
      try {
        const hashData = `Game/Categories/${casinoServerIp}/${tid}/${key}/${pwd}`;
        const hash = crypto.createHash('md5').update(hashData).digest('hex');

        const url = `${fundistUrl}/Game/Categories/?&TID=${tid}&Hash=${hash}`;
        const response = await axios.get(url);
    
        console.log(response.data,'ini response')
        // Step 4: Handle the response
        if (response.status === 200) {
          console.log('Success:', response.data);
          res.send({status:true,data:response.data})

        } else {
          console.error('Error:', response.status, response.statusText);
          res.send({status:false,message:response.statusText})
        }
      } catch (error) {
        console.error('An error occurred:', error.message);
        res.send({status:false,message:error.message})
      }

  }

  const get = async(req,res)=>{
    
  try {
    const body = req.body
    if(!body.path) return res.send({status:false,message:'path must be submited pathX/pathY'})
    const tid = moment().unix().valueOf()+Math.floor(Math.random() * 10);;
    const path = body.path // Game/Categories
    const hash = generateHash(path,tid)
    const hashData = `${path}/${casinoServerIp}/${tid}/${key}/${pwd}`;

    // console.log(hashData)


    const url = `${fundistUrl}/${path}/?&TID=${tid}&Hash=${hash}`;
    const response = await axios.get(url);
    res.send({status:true,data:response.data})

  } catch (error) {
    res.send({status:false,message:error.message})
  }

  }


  // const post = async(req,res)=>{

  // }

  module.exports = { 
    callback,
    authentication,
    gameCatalog,
    gameCategory,
    get,
    // post
  };



// 9.1 3.1.Getgamecategories
// [URL] has a form of:
// https://[SERVER]/System/Api/[KEY]/Game/Categories/?
// &TID=[TID]
// &Hash=[HASH]
// where:
// [HASH] – MD5 checksum of the following data: Game/Categories/[CASINO_SERVER_IP]/[TID]/[KEY]/[PWD]
// Server response:
// 1. On success, JSON formatted data is returned
// 2. On error, and error code and description is returned, according to Appendix 1 JSON response:
// [
// {
// "ID" : "globally unique numeric category ID",
// "Trans" : {
// "en" : "Name in English, always present",
// ...
// },
// "Tags" : [
// "main",
// ...
// ],
// },
// 3. Game Lists – 32
// Fundist – Fundist API v279(wr)
// ... ]
// Note: "main" tag identifies primary category type. Non-primary categories are not necessary needed to be used/displayed.