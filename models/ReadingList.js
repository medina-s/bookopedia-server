module.exports = (sequelize, DataTypes) => {
    const ReadingList = sequelize.define("ReadingList", {
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
            status: {
                type: DataTypes.STRING(10),
                allowNull: false,
                unique: false,
            },
            
    })
    return User
}