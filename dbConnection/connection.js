//import mongoose
const mongoose=require('mongoose')

//connection string
const connectString=process.env.DATABASE

//connecting
mongoose.connect(connectString).then(()=>{
    console.log("MongoDB server is connected!!")
}).catch(rej=>{
    console.log("MongoDB connection is Failed!!",rej)
})
