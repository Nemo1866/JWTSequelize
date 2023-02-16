const { verify } = require("jsonwebtoken")

function checkAuth(req,res,next){
    let token=req.get('Authorization')
    if(token){
        token=token.slice(7)
        verify(token,process.env.SECRET_KEY,(err,result)=>{
            if(err){
                res.json({
                    err:"Invalid Token"
                })
            }else{
                next()
            }
        })
    }else{
        res.json({
            msg:"Please Provide Token TO access our page"
        })
    }
    
}
module.exports=checkAuth