const blogModel = require('../model/blogModel')
const authorModel = require('../model/authorModel')
const mongoose = require('mongoose')
 let ObjectId = mongoose.Types.ObjectId
 let Regex = /^[A-Za-z- ]{3,30}$/



exports.createBlog = async (req, res) => {
  try {
    let { title, body, authorId, tags, category, subcategory } = req.body
    if (Object.keys(req.body).length == 0) return res.status(400).send({ status: false, message: "please provide key in request body" })
    if (!title) return res.status(400).send({ status: false, message: "require title" })
    if (!body) return res.status(400).send({ status: false, message: "require body" })
    if (!authorId) return res.status(400).send({ status: false, message: "require authorId" })
    if (!category) return res.status(400).send({ status: false, message: "require category" })
    if (!subcategory) return res.status(400).send({ status: false, message: "require subcategory" })

if(!ObjectId.isValid(authorId))return res.status(400).send({ status: false, message: " invalid objectId" })
if(!title.match(Regex))return res.status(400).send({status : false , message : "provide valid title"})
if(!body.match(Regex))return res.status(400).send({status : false , message : "provide valid body"})
if(!Regex.test(...tags))return res.status(400).send({status : false , message : "provide valid tags"})
if(!category.match(Regex))return res.status(400).send({status : false , message : "provide valid category"})
if(!Regex.test(...subcategory))return res.status(400).send({status : false , message : "provide valid subcategory"})


    const authorValid = await authorModel.findById({ _id: authorId })

    if (!authorValid) return res.status(404).send({ status: false, message: "author id is not existing" })
    req.body.publishedAt = new Date()
    const create = await blogModel.create(req.body)
    res.status(201).send({ status: true, data: create })

  } catch (err) {
    res.status(500).send({ status: false, message: err.message })
  }
}


exports.getBlogs = async (req, res) => {
  try {
    let data = req.query
    data.isDeleted = false
    data.isPublished = true
    let findData = await blogModel.find(data)
    if(findData.length==0)return res.status(404).send({status : false , message : " data not found"})
    res.status(200).send({ status: true, data: findData })
  } catch (err) {
    res.status(500).send({ status: false, message: err.message })
  }
}

exports.putApi = async (req, res) => {
  try {
    let data = req.body
    const { title, body, tags, subcategory } = data

    let id = req.params.blogId
    if(!ObjectId.isValid(id))return res.status(400).send({ status: false, message: " invalid objectId" })

    if(!title.match(Regex))return res.status(400).send({status : false , message : "provide valid title"})
    if(!body.match(Regex))return res.status(400).send({status : false , message : "provide valid body"})
    if(!Regex.test(...tags))return res.status(400).send({status : false , message : "provide valid tags"})
    if(!Regex.test(...subcategory))return res.status(400).send({status : false , message : "provide valid subcategory"})
    
    let blogId = await blogModel.findOne({ _id: id }, { isDeleted: true })
    if (!blogId) return res.status(404).send({ status: false, message: "blogId is not exist" })

    const updateData = await blogModel.findOneAndUpdate({_id :id}, {
      $set :{title :title ,body :body},
      $push :{tags : tags ,subcategory :subcategory}}
     ,{new : true})
   

    res.status(201).send({ status: true, data: updateData })
  } catch (err) {
    res.status(500).send({ status: false, message: err.message })
  }
}


exports.deleted = async (req, res) => {
  try {

    let Id = req.params.blogId

  if(!ObjectId.isValid(Id))return res.status(400).send({ status: false, message: " invalid blogid" })
    let data = await blogModel.findOneAndUpdate({ _id: Id, isDeleted: false }, { isDeleted: true }, { new: true })
    if (!data) return res.status(404).send({ status: false, message: "blogId is not found  " })
    res.status(200).send({ status: true, data: data })

  } catch (err) {
    res.status(500).send({ status: false, message: err.message })
  }
}



exports.deletedByQuery = async (req, res) => {
  try {

    let data = req.query
    data.isDeleted = false
    let updateData = await blogModel.updateMany(find, { isDeleted: true }, { new: true })
    if(!updateData)return res.status(404).send({ status: false, message: "not match query " })
    res.status(200).send({ status: true, data: updateData })

  } catch (err) {
    res.status(500).send({ status: false, message: err.message })
  }
}