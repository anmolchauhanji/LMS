import jwt from "jsonwebtoken"

const isAuthenticated = async (req,res,next)=>{
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({
               success:false,
                message:"user not autherized",
                
            })
        }
        const decode = await jwt.verify(token,process.env.SECRET_KEY)
        if (!decode) {
            return res.status(401).json({
                success:false,
                message:"invalide token"
            })
        }
        req.id = decode.userId
        next()

    } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"faled to logout"
    })
  }
    }


    export default isAuthenticated