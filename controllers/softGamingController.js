const { default: axios } = require("axios");
const { db } = require("../config/firebase");
const crypto = require('crypto');
const moment = require("moment");
require('dotenv').config();  // Load environment variables from .env

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

  module.exports = { callback,authentication,gameCatalog };