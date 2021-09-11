// Grab db instance
const { sequelize, synceDb } = require('../db')
const { DataTypes } = require('sequelize')

// Grab Model Functions
const DefineUser = require('./User')
const DefineReview = require('./Review')
const DefineReadingList = require('./ReadingList')

const User = DefineUser(sequelize, DataTypes) // Defines the model
const Review = DefineReview(sequelize, DataTypes) // Defines the model
const ReadingList = DefineReadingList(sequelize, DataTypes) // Defines the model

// Define Associations
User.hasMany(Review)
Review.belongsTo(User)

User.hasMany(ReadingList)
ReadingList.belongsTo(User)

// Sync
synceDb(sequelize, { alter:true })

module.exports = { User, Review, ReadingList }