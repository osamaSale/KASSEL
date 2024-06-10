# KASSELSoft

<!-- Clone this repository using bash terminal: -->

    git clone https://github.com/osamaSale/KASSEL

<!--End clone area -->




#Course management system

A course management web application where teachers can create and update courses, and students can view courses. The application uses Node.js, Express, MySQL, and JWT for authentication and React with Redux for the front-end.

## table of contents

- [Basic Requirements](#Basic Requirements)
- [Install](#Install)
- [Database Setup](#database-setup)
- [Running the application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Front End](#Front End)

## Basic requirements

- Node.js and npm: [Download and install Node.js](https://nodejs.org/)
- MySQL: [Download and install MySQL](https://www.mysql.com/)

## stabilizing

1. **Clone Repository:**

 ``` bash
 Git clone https://github.com/osamaSale/KASSEL
 Course management system cd
 ```

2. **Install server dependencies:**

 ``` bash
 CD server
 npm install
 ```

3. **Install client dependencies:**

 ``` bash
 cd../client
 npm install
 ```

## Database setup

1. **Starting MySQL Server:**

 Make sure the MySQL server is running.

2. **Create a database and tables:**

 ``` SQL
 Create Course_management database;
 Use Course_management;

 Create table users (
 INT AUTO_INCREMENT primary key ID,
 The name VARCHAR(100) is not empty,
 Email VARCHAR(100) is not a unique blank,
 Password VARCHAR(255) is not empty,
 ROLE ENUM('student', 'teacher') is not empty
 );

 Create a table courses
 INT AUTO_INCREMENT primary key ID,
 The name VARCHAR(100) is not empty,
 text description,
 start_date date,
 end_date date,
 teacher_id you are,
 Foreign key (teacher_id) User references (id)
 );
 ```

3. **Configure database connection:**

 Create an `.env` file in the `server` directory with the following content:

 ```Environment
 DB_HOST=localhost
 DB_USER=root
 DB_PASSWORD=Your password
 DB_NAME=course_management
 JWT_SECRET=your_jwt_secret
 ```

## Run the application

1. **Starting the server:**

 ``` bash
 CD server
 npm start
 ```

 The server will run at `http://localhost:5000`.

2. **Start the client:**

 ``` bash
 cd../client
 npm start
 ```

 The client will run at `http://localhost:3000`.

## API endpoints

- **POST /auth/register**: Register a new user
- **POST /auth/login**: Login the user and get the JWT token
- **Get/courses**: Get the list of courses (protected path)

## End of introduction

The front end is built using React and Redux.

### Scripts available

In the Client directory, you can run:

- `npm start`: Run the application in development mode.
- `npm-test`: Run the test runner in interactive monitor mode.
- `npm run build`: Build the production application in the `build` folder.

### Items

- ``CourseList``: Displays the list of courses.
- `CourseForm`: A form for creating and updating courses.
- `Log in`: Login form.
- `Registration`: Registration form.

### recovery

- **Slides**:
 - `authSlice`: Handles the authentication status.
 - `courseSlice`: Handles the status of courses.

### Navigation

- **Students** can view the list of courses.
- **Teachers** can create and update courses.

## license

This project is licensed under the MIT License.
