module.exports=(sequelize,DataTypes)=>{
    let cred=sequelize.define("usercred",{
        token:{
            type:DataTypes.STRING
        }
    },{
        timestamps:false
    })
    return cred
}