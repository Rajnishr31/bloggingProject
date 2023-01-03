const blogModel = require('../model/blogModel')
const authorModel = require('../model/authorModel')
const mongoose= require('mongoose')

exports.createBlog = async (req,res)=>{
  try{
    
  let {title , body, authorId , tags , category , subcategory } = req.body
  const authorValid = await authorModel.findById({_id : authorId})
  c
  if(!authorValid )return res.status(404).send({status :false  , message : "author id is not existing"})
 req.body.publishedAt= new Date() 
  const create = await blogModel.create(req.body)
res.status(201).send({status : true , data :create })

}catch(err){
  res.status(500).send({status :false , message : err.message})
}
}


exports.getBlogs = async (req ,res)=>{
 try{
  let data = req.query
  data.isDeleted = false
  data.isPublished = true
  let findData = await blogModel.find(data)
  res.status(200).send({status: true , data : findData})
}catch(err){
  res.status(500).send({status :false , message : err.message})
}
}

exports.putApi = async (req ,res)=>{
  try{
let data = req.body
const { title, body, tags, subcategory} = data
let id = req.params.blogId
let blogId =  await blogModel.findById({_id :id},{isDeleted :true})
if(!blogId)return res.status(404).send({status :false , message :"blogId is not exist"})

const updateData = await blogModel.findOneAndUpdate({_id :id},{$set :{title :title ,body :body,tags:{$add :tags} ,subcategory :{$add : subcategory}}})

res.status(201).send({status:true ,data :updateData})
}catch(err){
  res.status(500).send({status :false , message : err.message})
}
}


exports.deleted = async (req, res) => {
try{

  let Id = req.params.blogId
  console.log(Id);
  let data = await blogModel.findOneAndUpdate({ _id: Id, isDeleted: false }, { isDeleted:true },{new : true})
  if(!data) return res.status(404).send({status:false , message : "blogId is not found  "})
  res.status(200).send({status :true , data :data})

}catch(err){
  res.status(500).send({status :false , message : err.message})
}
}



exports.deletedByQuery = async (req ,res)=>{
try{

  let data  =  req.query
  data.isDeleted = false
  let updateData = await blogModel.updateMany(find , {isDeleted : true},{new : true})
  res.status(200).send({status : true , data : updateData})

}catch(err){
  res.status(500).send({status :false , message : err.message})
}
}