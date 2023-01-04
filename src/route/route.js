const express = require('express')
const route = express.Router()
const mongoose = require('mongoose')
const authorController = require('../controller/authorController')
const blogController = require('../controller/blogController')
const middleware = require('../middleware/middleware')

route.post('/authors' ,authorController.authorCreate)
route.post('/login' ,authorController.logIn)
route.post('/blogs' ,middleware.auth1, middleware.auth2, blogController.createBlog)
route.get('/blogs', middleware.auth1, blogController.getBlogs)
route.put('/blogs/:blogId' ,middleware.auth1, middleware.auth2, blogController.putApi)
route.delete('/blogs/:blogId',middleware.auth1, middleware.auth2, blogController.deleted)
route.delete('/blogs',middleware.auth1,blogController.deletedByQuery)
 

route.all('*/',(req ,res)=>{
  res.status(400).send({status: false , message :" path invalid"})
})

module.exports = route