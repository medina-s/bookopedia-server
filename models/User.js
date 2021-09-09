module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
            username: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true,
            },
            email: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true,
            },
            firstname: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: false,
            },
            lastname: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: false,
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: false,
            },
            role: {
                type: DataTypes.STRING(10),
                allowNull: false,
                unique: false,
            }
            
    })
    return User
}