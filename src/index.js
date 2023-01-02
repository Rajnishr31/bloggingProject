
const express = require('express')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const app = express()

app.use(express.json())

mongoose.connect("mongodb+srv://shyamgupta:.T!8NRrzf6FyMYc@cluster0.dbdyccj.mongodb.net/shyamsession3-db")
.then(()=>console.log('MONGO DB IS CONNECTED'))
.catch((err)=>console.log(err.message))

// app.use('/' ,route)

app.listen( 3000, (err)=>{
  if(err)return console.log(err.message)
  console.log("Server listening on Port :",  3000)
})

