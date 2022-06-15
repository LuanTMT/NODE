const sequelize = require("sequelize");

module.exports = (sequelize,DataTypes)=>{
    const User = sequelize.define(
        'User',
    { id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true,
    },
    firstName:{
        type: DataTypes.STRING,
        allowNull : false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull : false,
    },
    iamRole : {
        type: DataTypes.STRING,
        allowNull : false,
    },
    userName:{
        type: DataTypes.STRING,
        allowNull : false,
        unique : true,
    },
    email : {
        type: DataTypes.STRING,
        allowNull : false,
        unique : true,
    },
    phone : {
        type: DataTypes.STRING,
        allowNull : false,
        unique : true,
    },
    address : {
        type: DataTypes.STRING,
       
    }  ,
    pwdHash:{
        type: DataTypes.STRING,
        allowNull : false,
    } ,
    isPwdSalt :{
        type: DataTypes.BOOLEAN,
        defaultValue :0,
    },
    pwdAlgorithm:{
        type: DataTypes.STRING,
    }, 
    },
    {
        timestamps : true,
    }
);
return User;
};