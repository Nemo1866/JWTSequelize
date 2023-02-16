require("dotenv").config()
const bcrypt=require('bcrypt')
const jwt=require("jsonwebtoken")

const { User, Cred } = require('../connection')

module.exports={
    createUser:async(req,res)=>{
        let body=req.body
        let hashPassword=await bcrypt.hash(body.password,10)
        let result=await User.create({
            username:body.username,
            email:body.email,
            password:hashPassword

        })
        if(!result){
            res.json({
                msg:'Some Error Occured in Database'
            })
        }else{
            res.json({
                msg:"Sucessfully Saved in Database"
            })
        }
        
    },welcome:(req,res)=>{
        res.json({
            msg:"Welcome to our website",
            client:"Those are the details of our client",
            1:"Naeem",
            2:"Murtaza",
            3:"Amruta",
            4:"Ahmed"
        })
    },login:async(req,res)=>{
        let {email,password}=req.body
        let result =await User.findOne({where:{email:email}})
        if(!result){
            res.json({
                msg:"Please check your email address and try again"
            })
        }
        let compareP=await bcrypt.compare(password,result.password)
        if(!compareP){
            res.json({
                msg:"Please check your password and try again"
            })
        }else{
            var token=jwt.sign(compareP,process.env.SECRET_KEY,)
            await Cred.findOrCreate({where:{token:token,userId:result.id}})
            res.json({
                msg:"Sucessfully Logged In",token:token
            })
        }
    },logout:async(req,res)=>{
        let username=req.params.id
        let check=await User.findOne({where:{username}})

        let result =await Cred.destroy({where :{userId:check.id}})
  
        res.json({
            msg:"Sucessfully Logout"
        })
    }
}