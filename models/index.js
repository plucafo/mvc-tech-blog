const BlogPost = require("./BlogPost");
const Comment = require("./Comment");
const User = require('./User');

BlogPost.hasMany(Comment, {
  foreignKey: "blogPostId",
});

Comment.belongsTo(BlogPost, {
  foreignKey: "blogPostId",
});

User.hasMany(BlogPost, {
  foreignKey: "user_id",
});

BlogPost.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { BlogPost, Comment, User };
