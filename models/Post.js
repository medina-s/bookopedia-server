module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", {
            content: {
                type: DataTypes.STRING
            }
    })
    return Post
}