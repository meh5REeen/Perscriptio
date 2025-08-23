import jwt from 'jsonwebtoken';

//user authentication middleware

export const authUser = async (req,res,next) => {
    try{
        const {token} = req.headers;
        if(!token){
            return res.json({success:false, message:"NOt authorized login again"})
        }

        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET);
        if(req.method === "GET"){
        req.userId = tokenDecode.id
        }
        else{
            req.body.userId = tokenDecode.id
        }
        next();
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
