//import user model
const projects = require('../Models/projectSchema')
const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')


exports.register = async (req, res) => {
    console.log("Inside Register Function")
    const { username, password, email } = req.body
    console.log(`Username:${username},Password:${password},Email:${email}`)
    try {
        const excistingUser = await users.findOne({ email })
        console.log(excistingUser)
        if (excistingUser) {
            res.status(406).json("Excisting User..Please Try again!!")
        }
        else {
            const newUser = new users({ username, password, email, image: "", github: "", linkdin: "" })
            await newUser.save()
            res.status(200).json(newUser)

        }
    }
    catch (err) {
        res.status(401).json("Something Went Wrong," + err)
    }

}

exports.login = async (req, res) => {
    console.log("inside login function!")
    const { email, password } = req.body
    try {
        const excistingUser = await users.findOne({ email, password })
        if (excistingUser) {
            const token = jwt.sign({ userId: excistingUser._id }, "secretid")
            // console.log(excistingUser)
            res.status(200).json({
                excistingUser,
                role: "user",
                token
            })
            
        }
        else {
            res.status(406).json("Invalid Email/Password!!")
        }
    }
    catch (err) {
        res.status(500).json("Something Went Wrong!!" + err)
    }
}

exports.userProjects = async (req, res) => {
    console.log("Inside User Projects")
    console.log(req.payload)
    try {
        const data = await projects.find({ userId: req.payload })
        console.log(data)
        res.status(200).json(data)

    }
    catch (err) {
        res.status(401).json(err)
    }
}

exports.homeProjects = async (req, res) => {
    console.log("Inside Home Projects")
    try {
        const data = await projects.find().limit(3)
        console.log(data)
        res.status(200).json(data)
    }
    catch (err) {
        res.status(401).json(err)
    }
}

exports.allProjects = async (req, res) => {
    console.log("Inside Allprojects")
    const searchKey=req.query.search
    console.log(req.query)
    const query={
        languages:{$regex:searchKey,$options:"i"}
    }
    try {
        const data = await projects.find(query)
        console.log(data)
        res.status(200).json(data)
    }
    catch (err) {
        res.status(401).json(err)
    }
}


exports.editProject = async (req, res) => {
  const userId=req.payload
  const {title,overview,languages,github,demo}=req.body
  const uploadedFile=req.file?req.file.filename:req.body.project_image
  const {id}=req.params
  try{
    console.log("inside edit")
    const result=await projects.findByIdAndUpdate({_id:id},{title,overview,languages,github,demo,project_image:uploadedFile,userId})
    console.log(result)
    res.status(200).json(result)
  }
  catch(err){
    console.log(err)
    res.status(401).json(err)
  }
//   res.send(`${title},${overview},${uploadedFile},${id}`)
}

exports.deleteProject = async (req,res)=>{
    const {id}=req.params
    try{
        console.log("inside delete")
        const result=await projects.findByIdAndDelete({_id:id})
        console.log(result)
        res.status(200).json(result)
    }
    catch(err){
        res.status(401).json(err)
    }
}

exports.profileUpdate = async (req,res)=>{
    const {id}=req.params
    const {username,email,password,github,linkdin}=req.body
    const image=req.file?req.file.filename:req.body.image
    try{
        const result=await users.findByIdAndUpdate({_id:id},{username,password,email,image,github,linkdin})
        res.status(200).json(result)
    }
    catch(err){
        res.status(401).json(err)
    }

  
}