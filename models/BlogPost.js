// import Sequelize and the connection to your database
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// define the BlogPost model by extending the Model class from sequelize
class BlogPost extends Model {}

BlogPost.init(
  {
    // define columns of the BlogPost table
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Pass the Sequelize connection instance
    modelName: "BlogPost", // Set the model name
    timestamps: true, // Add createdAt and updatedAt columns
    freezeTableName: true, // Stops sequelize from auto-pluralizing the table name
    underscored: true, // Converts camelCase column names to snake_case
  }
);

// Export the BlogPost model for use in other parts of your application
module.exports = BlogPost;
