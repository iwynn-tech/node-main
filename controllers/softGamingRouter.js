const { db } = require("../config/firebase");

const callback = async (req, res) => {

    db.collection('callback').add({type:'softgaming',...req.body})
    .then((e)=> res.status(200).json({ status: true,message:e.id }))
    .catch((e)=>res.status(400).json({status:false,message:e.message}))
  };

  module.exports = { callback };