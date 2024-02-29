const sampleMiddleware=(req,res,next)=>{
    console.log("Middle ware is on Act!!")
     next()
}

module.exports=sampleMiddleware