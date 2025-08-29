import jwt from 'jsonwebtoken';

//doctor authentication middleware

export const authDoctor = async (req,res,next) => {
    try{
       
        const {dtoken} = req.headers;
        if(!dtoken){
            return res.json({success:false, message:"NOt authorized login again"})
        }

        const tokenDecode = jwt.verify(dtoken,process.env.JWT_SECRET);
        if(req.method === "GET"){
        req.docId = tokenDecode.id
        }
        else{
            req.body.docId = tokenDecode.id
        }
        next();
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
