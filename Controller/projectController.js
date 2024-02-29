// const { json }=require('express')
const projects=require('../Models/projectSchema')

const addProjects=async(req,res)=>{
    console.log("Inside addprojects Function!!")
    console.log(req.file.filename)
    const {title,overview,languages,github,demo,userId}=req.body
    console.log(`${title},${overview},${languages},${github},${demo},${userId}`)
    const project_image=req.file.filename
    // res.send("Addprojects request is hit!!")
    try{
        const excistingProject=await projects.findOne({github})
        if(excistingProject){
            res.status(406).json("Excisting Project")
        }
        else{
            const newProject=new projects({title,overview,languages,github,demo,project_image,userId})
            await newProject.save()
            res.status(200).json(newProject)
        }
    }
    catch(err){
        res.status(401).json("Something Went Wrong!! " + err)
    }
}

module.exports={
    addProjects
}