const express = require('express');
const multer = require('multer');
const path = require('path');
const { register, login, uploadBlog, fetchBlog, deleteBlog, fetchsingleBlog, updateBlog } = require('../controller/userController');

const userRoute=express.Router()

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Using absolute path
      cb(null, path.resolve(__dirname, '../../Frontend/public/'));
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });

const upload = multer({ storage });


userRoute.post('/register',register)
         .post('/login',login)
         .post('/addblog',upload.single('image'),uploadBlog)
         .get('/fetchblog',fetchBlog)
         .delete('/deleteblog',deleteBlog)
         .get('/fetchsingleblog',fetchsingleBlog)
         .put('/updateblog',upload.single('image'),updateBlog)

module.exports = userRoute;