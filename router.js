const { createUser, welcome, login, logout } = require("./controller/controller")
const checkAuth = require("./middleware")

const router=require("express").Router()

router.post("/register",createUser)
router.get("/",checkAuth,welcome)
router.post("/login",login)
router.get("/logout/:id",logout)

module.exports=router