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
  return crypto.createHash('md5').update(hashData).digest('hex');
}

function generatePassword(d){
  return crypto.createHash('md5').update(d.Login).digest('hex');
}

function generateHashUser(endpoint, tid,login,password,currency) {
  const hashData = `${endpoint}/${casinoServerIp}/${tid}/${key}/${login}/${password}/${currency}/${pwd}`;
  return crypto.createHash('md5').update(hashData).digest('hex');
}



  const get = async(req,res)=>{
    
  try {
    const body = req.body
    if(!body.path) return res.send({status:false,message:'path must be submited pathX/pathY'})
    const tid = moment().unix().valueOf()+Math.floor(Math.random() * 10);;
    const path = body.path // Game/Categories
    const hash = generateHash(path,tid)

    let params =""
    if(req?.body?.param?.length>0)
      params = params.map(obj => {
        return Object.keys(obj)
            .map(key => `${key}=${encodeURIComponent(obj[key])}`) // Use encodeURIComponent to handle special characters
            .join('&');
    }).join('&'); // Join all key=value pairs with '&'


    const url = `${fundistUrl}/${path}/?&TID=${tid}&Hash=${hash}${params}`;
    console.log(url)
    const response = await axios.get(url);
    res.send({status:true,data:response.data})

  } catch (error) {
    res.send({status:false,message:error.message})
  }

  }

  const user = async(req,res)=>{
    try {
      const body = req.body
      if(!body.path) return res.send({status:false,message:'path must be submited pathX/pathY'})

      const tid = moment().unix().valueOf()+Math.floor(Math.random() * 10);;
      const path = body.path // Game/Categories
      const login = body.param.find(param => param.Login !== undefined);
      const currency = body.param.find(param => param.Currency !== undefined);

      const password = generatePassword(login)
      const hash = generateHashUser(path,tid,body.Login,password,currency?currency:"IDR")
  
      let params =""
      if(req?.body?.param?.length>0)
        params = body.param.map(obj => {
          return Object.keys(obj)
              .map(key => `${key}=${encodeURIComponent(obj[key])}`) // Use encodeURIComponent to handle special characters
              .join('&');
      }).join('&'); 

  
  
      
      const url = `${fundistUrl}/${path}/?&TID=${tid}&Hash=${hash}&password=${password}&${params}`;
      console.log(url,'ini url nya...')

      const response = await axios.get(url);
      res.send({status:true,data:response.data})
  
    } catch (error) {
      console.log(error.message)
      res.send({status:false,message:error.message})
    }
  
    
  }


  module.exports = { 
    user,
    get,
  };


