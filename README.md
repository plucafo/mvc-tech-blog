# MVC Tech Blog

This is a simple tech blog application built using the Model-View-Controller (MVC) architecture with Node.js, Express.js, Sequelize, and Handlebars.

[![Screenshot of landing page](/public/images/screenshot.png)](/public/images/screenshot.png)

## Links

- [Github Repo](https://github.com/plucafo/mvc-tech-blog)
- [Deployed App](https://mvc-tech-blog-plucafo-5b650420f4c4.herokuapp.com/)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)

## Features

- User authentication (sign up, sign in, sign out)
- Create, read, update, and delete blog posts
- Add comments on blog posts
- Responsive design using Bootstrap and Tailwind

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/mvc-tech-blog.git

   ```

2. Navigate to the project directory:

   ```bash
   cd mvc-tech-blog

   ```

3. Set up environment variables:

   ```bash
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   SESSION_SECRET=your_session_secret

   ```

4. Install dependencies:

   ```bash
   npm i

   ```

5. Source database schmema and seed database:

   ```bash
   source db/schema.sql
   npm run seed
   ```

## Usage

1. Start the server:

   ```bash
   npm start

   ```

2. Open your web browser and go to http://localhost:3001 to access the application.

## Dependencies

- bcrypt: ^5.1.1
- bootstrap: ^5.3.3
- connect-session-sequelize: ^7.1.7
- dotenv: ^16.4.5
- express: ^4.19.2
- express-handlebars: ^7.1.2
- express-session: ^1.18.0
- handlebars: ^4.7.8
- mysql2: ^3.9.2
- sequelize: ^6.37.1

## Creator

- [plucafo](https://github.com/plucafo)
