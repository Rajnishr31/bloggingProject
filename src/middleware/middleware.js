
// const jwt = require('jsonwebtoken')
// const authorModel = require('../controller/authorController')

// exports.auth1 = (req ,res,next)=>{

//  let token  = req.headers['x-auth-key']
//  if(!token)return res.status(400).send({status:false , message : "provide  a token" })

//   jwt.verify(token , "first project " ,(err ,decoded)=>{
//     if(err)return res.status(401).send({status : false , message : err.message})
//      req.id = decoded.authorId
//      next()
//   })

// }

// exports.auth2  =(req,res,next)=>{

//   let authorId =req.body.authorId
//   let blogId = req.params.blogId
//   let decodedId = req.id
  
//   if(authorId){
//     if(decodedId != authorId)return res.status(403).send({status :false ,message:"unauthorization"})
//     next()
//   }
//   if()






// }

