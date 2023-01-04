const mongoose= require('mongoose')

const blogSchema = new mongoose.Schema({
 title: {type: String , required :true, trim : true},
  body: {type: String , required :true, trim : true},
 authorId: {type : mongoose.Schema.Types.ObjectId , ref : 'Author',required : true, trim : true},
  tags: [{type :String, trim : true}],
  category: {type: String , required :true, trim : true},
   subcategory:[{type :String , required : true, trim : true}] ,

deletedAt: Date,
 isDeleted: {type :Boolean, default: false}, 
 publishedAt: Date,
 isPublished: {type :Boolean, default: false}

},{timestamps : true})

module.exports = mongoose.model('blog' , blogSchema)