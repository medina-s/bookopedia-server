// Grab db instance
const { sequelize, synceDb } = require('../db')
const { DataTypes } = require('sequelize')

// Grab Model Functions
const DefineUser = require('./User')
const DefinePost = require('./Post')

const User = DefineUser(sequelize, DataTypes) // Defines the model
const Post = DefinePost(sequelize, DataTypes) // Defines the model

// Define Associations
User.hasMany(Post)
Post.belongsTo(User)

// Sync
synceDb(sequelize, { alter:true })


module.exports = { User, Post }