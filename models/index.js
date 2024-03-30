const BlogPost = require("./BlogPost");
const Comment = require("./Comment");

BlogPost.hasMany(Comment, {
  foreignKey: "blogPostId",
});

Comment.belongsTo(BlogPost, {
  foreignKey: "blogPostId",
});

module.exports = { BlogPost, Comment };
