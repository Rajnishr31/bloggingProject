const express = require('express')
const route = express.Router()
const mongoose = require('mongoose')
const authorController = require('../controller/authorController')
const blogController = require('../controller/blogController')

route.post('/authors' ,authorController.authorCreate)
route.post('/blogs' ,blogController.createBlog)




module.exports = route