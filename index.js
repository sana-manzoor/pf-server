// to get env file while server is running,import dotenv
require('dotenv').config()

//import express.js
const express=require('express')

//import cors
const cors=require('cors')

//create express server
const pfServer=express()

//implementing cors to server
pfServer.use(cors())

//parsing json data using server app
pfServer.use(express.json())

//import router
const router=require('./Routes/routes')


//import connection.js
require('./dbConnection/connection')

//import middleware
const middleware=require('./Middlewares/userMiddleware')
pfServer.use(middleware)

//use router to server
pfServer.use(router)

//port numver configuration
const PORT=4000 || process.env.PORT

//serving upload files
pfServer.use('/upload',express.static('./uploads'))


//to run server
pfServer.listen(PORT,()=>{
    console.log(`Server is started at ${PORT}`)
})

//resolve request to localhost:400
pfServer.get('/',(req,res)=>{
    res.send("<h1>Server is running successfully</h1>")
})

pfServer.post('/',(req,res)=>{
    res.send("<h1>Post Request Is successful</h1>")
})