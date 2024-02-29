const jwt=require('jsonwebtoken')

const jwtMiddleware=(req,res,next)=>{
    console.log("inside jwt middleware!!")
    console.log(req.headers)
    try{
        const token=req.headers.authorization.split(" ")[1]
        //  console.log(token)
        const result=jwt.verify(token,"secretid")
        console.log(result)
        req.payload=result.userId
        next()
    }
    catch{
        res.status(401).json("Authorization Failed!Login First!!")
    }
}





module.exports=jwtMiddleware