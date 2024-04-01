const sequelize = require("../config/connection");
const BlogPost = require("../models/BlogPost");
const User = require("../models/User")

const userData = [
  {
    "name": "Admin",
    "email": "admin@gmail.com",
    "password": "password123"
  }
]

const blogPostData = [
  {
    title: "Why MVC is so important",
    content:
      "MVC allows developers to maintain a true separation of concerns, deviding their code between the Model layer for data, the View layer for design, and the Controller layer for application logic.",
    author: "Milhouse",
  },
  {
    title: "Authentication vs. Authorization",
    content:
      "There is a difference between authentication and authorization. Authentication means confirming your own identity, whereas authorization means being allowed to access the system.",
    author: "Ralph",
  },
];

const seedBlogPost = async () => {
  await sequelize.sync({ force: true });
  await User.bulkCreate(userData);
  await BlogPost.bulkCreate(blogPostData);
  process.exit(0);
};

seedBlogPost();
