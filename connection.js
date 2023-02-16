require("dotenv").config()
const {Sequelize,DataTypes}=require("sequelize")

const sequelize=new Sequelize(process.env.DATABASE,process.env.USER,process.env.PASSWORD,{
    host:process.env.HOST,
    dialect:process.env.DIALECT,
 logging:false
})

sequelize.authenticate().then(()=>{
    console.log("Database is connected");
}).catch(err=>{
    console.log(err);
})

let db={}
db.sequelize=sequelize
db.Sequelize=Sequelize
db.User=require("./model/User")(sequelize,DataTypes)
db.Cred=require("./model/UserCred")(sequelize,DataTypes)

db.User.hasOne(db.Cred)
db.Cred.belongsTo(db.User)


sequelize.sync({alter:true}).then(()=>{
    return
})

module.exports=db
