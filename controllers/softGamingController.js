const { db } = require("../config/firebase");

// const crypto = require('crypto');
// const base = Object.assign({}, requestBody);
// delete base.hmac;
// if ('actions' in base) {
// let actions = '';
// for (const action of base.actions) {
//         Object.keys(action).sort().forEach(key => actions += action[key]);
//     }
//     base.actions = actions;
// }
// const hash = crypto.createHash('sha256');
// const hmac = crypto.createHmac('sha256', hash.update(secretKey).digest('buffer'));
// let hmacBase = '';
// Object.keys(base).sort().forEach(key => hmacBase += base[key]);
// const hmacString = hmac.update(hmacBase).digest('hex');



const callback = async (req, res) => {
    db.collection('callback').add({type:'softgaming',...req.body})
    .then((e)=> res.status(200).json({ status: true,message:e.id }))
    .catch((e)=>res.status(400).json({status:false,message:e.message}))
  };

  module.exports = { callback };