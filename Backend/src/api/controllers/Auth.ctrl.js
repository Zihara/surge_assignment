const jwt = require("jsonwebtoken");

const verifyWebToken = (request,response,next)=>{
    const token = request.cookies.access_token;
    if(!token) {
        return response.json("You are not authenticated. Please login")
    }
    jwt.verify(token,process.env.SECRET_KEY,(error,user)=>{
        if(error) {
            //console.log(error)
            return response.json("Invalid token")
        }
        request.user = user
        //return response.json("You are authenticated")
        next();
    })
}

const verifyStudent = (request,response,next)=>{
    verifyWebToken (request,response,()=>{
        if(request.user.id===request.params.id){
            next()
            //return response.json("You can update your notes")
        }
        else{
            return response.json("You can't update your notes")
        }
    });
}

//verifyAdmin
const verifyAdmin = (request,response,next)=>{
    verifyWebToken (request,response,()=>{
        if(request.user.accountType==="admin"){
            next()
            //return response.json("You are a admin")
        }
        else{
            return response.json("You are not a admin")
        }
    });
}




module.exports = {verifyWebToken,verifyStudent,verifyAdmin}