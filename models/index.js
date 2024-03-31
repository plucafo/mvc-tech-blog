const BlogPost = require("./BlogPost");
const Comment = require("./Comment");
const User = require('./User');

BlogPost.hasMany(Comment, {
  foreignKey: "blogPostId",
});

Comment.belongsTo(BlogPost, {
  foreignKey: "blogPostId",
});

module.exports = { BlogPost, Comment, User };
