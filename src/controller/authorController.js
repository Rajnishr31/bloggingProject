const authorModel = require('../model/authorModel')
const mongoose = require('mongoose')
const blogModel = require('../model/blogModel')

exports.authorCreate = async (req ,res)=>{
  try{
  let data  = req.body
  const{fname ,lname ,title , email , password} = data
  const createAuthor = await authorModel.create(data)
  res.status(201).send({status :true, data : createAuthor })
}catch(err){
  res.status(500).send({status :false , message : err.message})
}
}


exports.logIn = async (req ,res) =>{
try{
  
  let { email ,password}  =  req.body
  if(!email)return res.status(400).send({status : false , message :"email is required"})
  if(!password)return res.status(400).send({status : false , message :"password is required"})

  let checkDetails = await blogModel.findOne(req.body)
  if(!checkDetails)return res.status(400).send({status : false , message : " email and password invalid"})
   const token = jwt.sign({authorId :checkDetails._id } ,"first project " , {expiresIn :'1h'})
   res.status(201).send({status :true ,token :token  })
}catch(err){
   res.status(500).send({status :false , message : err.message})
}
}