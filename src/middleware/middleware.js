
const jwt = require('jsonwebtoken')
const authorModel = require('../controller/authorController')
const blogModel = require('../model/blogModel')

exports.auth1 = (req ,res,next)=>{
  try{
 let token  = req.headers['x-auth-key']
 if(!token)return res.status(400).send({status:false , message : "provide  a token" })

  jwt.verify(token , "first project " ,(err ,decoded)=>{
    if(err)return res.status(401).send({status : false , message : err.message})
     req.id = decoded.authorId
     next()
  })
}catch(err){
  res.status(500).send({status: false ,message :err.message})
}

}



exports.auth2  = async (req,res,next)=>{
try{
  let authorId =req.body.authorId
  let blogId = req.params.blogId
  let decodedId = req.id
  
  if(authorId){
    if(decodedId != authorId)return res.status(403).send({status :false ,message:"unauthorization"})
    next()
  }
  if(blogId){
    let findData = await blogModel.findOne({_id : blogId , isDeleted : false})
   if(!findData)return res.status(404).send({status : false , message :"blog id is not exist"})
   if(decodedId != findData.authorId)return res.status(403).send({status : false , message :"unauthorization"})
   next()
    
  }
}catch(err){
  res.status(500).send({status: false ,message :err.message})
}
}

