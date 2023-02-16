
module.exports=(sequelize,DataTypes)=>{
    let User=sequelize.define("user",{
        username:{
            type:DataTypes.STRING,
            allowNull:true,
            unique:true
        },email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate:{
                isEmail:{
                    msg:"Please Provide a valid email"
                }
            }
        },password:{
            type:DataTypes.STRING,
            allowNull:false
        }

    },{
        timestamps:false
    })
    return User
}