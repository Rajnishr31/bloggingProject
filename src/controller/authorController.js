const authorModel = require('../model/authorModel')
const mongoose = require('mongoose')
const blogModel = require('../model/blogModel')

let nameRegex = /^[A-Za-z ]{3,10}$/
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8, 10}$/

exports.authorCreate = async (req ,res)=>{
  try{
  let data  = req.body
  const{fname ,lname ,title , email , password} = data


  if(!fname)return res.status(400).send({status : false , message : "require fname"})
  if(!lname)return res.status(400).send({status : false , message : "require lname"})
  if(!title)return res.status(400).send({status : false , message : "require title"})
  if(!email)return res.status(400).send({status : false , message : "require email"})
  if(!password)return res.status(400).send({status : false , message : "require password"})

  let  list  = ["Mr", "Mrs", "Miss"]
  if(!list.includes(title))return res.status(400).send({status : false , message : "title use to like Mr, Mrs, Miss"})
  if(!fname.match(nameRegex))return res.status(400).send({status : false , message : "provide valid fname"})
  if(!lname.match(nameRegex))return res.status(400).send({status : false , message : "provide valid lname"})
  if(!email.match(emailRegex))return res.status(400).send({status : false , message : "provide valid email "})
  // if(!password.match(passwordRegex))return res.status(400).send({status : false , message : "provide valid password"})

  let uniqueEmail = await authorModel.findOne({email : email})
  if(uniqueEmail)return res.status(400).send({status : false , message : " email already exist"})

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