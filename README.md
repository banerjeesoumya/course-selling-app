# Course Selling App Backend

This is a simple course selling app backend using Node.js. It has the following features :-
- Sign up
- Sign in
- Adding a course (By Admins)
- Purchasing a course (By Users)
- Display the purchased courses (By User)

## 1. Setting up the project locally

Install the required dependencies
```bash
cd backend
npm install
```

## 2. Creating a new config.js file

Create a new file name "config.js" file in the root directory and add the following content to it
```bash
module.exports = {
    JWT_SECRET : "your jwt secret key",
    mongo_url : "your mongo instance url" 
}
```
Use `sample.js` as a reference

## 3. Running the server

Run the server using the following command
```bash
node index.js
```

>N.B: Please test all the endpoints using [Postman](https://www.postman.com/)

