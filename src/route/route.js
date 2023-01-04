const express = require('express')
const route = express.Router()
const mongoose = require('mongoose')
const authorController = require('../controller/authorController')
const blogController = require('../controller/blogController')

route.post('/authors' ,authorController.authorCreate)
route.post('/blogs' ,blogController.createBlog)
route.get('/blogs', blogController.getBlogs)
route.put('/blogs/:blogId' ,blogController.putApi)
 route.delete('/blogs/:blogId',blogController.deleted)

 
  route.all('*/',(req, res )=>{
    res.status(400).send({status : false , message : 'invalid path'})
     })
   
module.exports = route