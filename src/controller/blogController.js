const blogModel = require('../model/blogModel')
const authorModel = require('../model/authorModel')
const mongoose= require('mongoose')

exports.createBlog = async (req,res)=>{
  let {title , body, authorId , tags , category , subcategory } = req.body

  const authorValid = await authorModel.findById({_id : authorId})
  console.log(authorValid)
  if(!authorValid )return res.status(404).send({status :false  , message : "author id is not existing"})

 req.body.publishedAt= new Date() 

  const create = await blogModel.create(req.body)
res.status(201).send({status : true , data :create })
}


exports.getBlogs = async (req ,res)=>{
 
  let data = req.query
  data.isDeleted = false
  data.isPublished = true
  let findData = await blogModel.find(data)
  res.status(200).send({status: true , data : findData})

}


exports.putApi = async (req ,res)=>{

let data = eq


}
