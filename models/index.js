const { User } = require('./user')
const { Post } = require('./post')
const { Comment } = require('./comment')

// say their associations

// user has many posts
// user has many comments
// they belong to user

// posts have many comments
// comments belong to posts

module.exports = { User, Post, Comment }