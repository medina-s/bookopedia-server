module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define("Review", {
            userid: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: false,
            },
            booktitle: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: false,
            },
            bookauthor: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: false,
            },
            reviewtext: {
                type: DataTypes.TEXT,
                allowNull: false,
                unique: false,
            },
            rating: {
                type: DataTypes.FLOAT,
                allowNull: false,
                unique: false,
            },
            
    })
    return User
}