const authorModel = require('../model/authorModel')
const mongoose = require('mongoose')

exports.authorCreate = async (req ,res)=>{
  let data  = req.body
  const{fname ,lname ,title , email , password} = data
  const createAuthor = await authorModel.create(data)
  res.status(201).send({status :true, data : createAuthor })
}



