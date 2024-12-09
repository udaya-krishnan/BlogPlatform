const User=require("../model/userModel")
const Blog=require("../model/blogModel")
const bcrypt = require("bcrypt");
const { generateTokens } = require("../utils/token");





const securePassword = async (password) => {
    try {
      const hashBcrypt = await bcrypt.hash(password, 10);
      if (hashBcrypt) {
        return hashBcrypt;
      }
    } catch (error) {
      console.log(error.message);
    }
  };




 const register=async(req,res)=>{
    try {
        const {username,email,password}=req.body
        console.log(username,email,password);
        const hashPassword=await securePassword(password)
        const createUser=await User.create({
            username:username,
            email:email,
            password:hashPassword,
        })
        res.status(201).json({ message: "created" });
    } catch (error) {
        console.log(error);
        res.status(500).json("server error")
    }
}



const login=async(req,res)=>{
    try {
        const {email,password}=req.body

        console.log(email,password,"user controller")

    const findUser = await User.findOne({ email: email });

    if (findUser) {
      const passMatching = await bcrypt.compare(password, findUser.password);
      if (passMatching) {
        const { accessToken, refreshToken } = await generateTokens({ id: findUser._id });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true, 
            maxAge: 15 * 60 * 1000, 
          });
        
          res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, 
          });
        let data = {};
        for (let key in findUser.toObject()) {
          if (key !== "password") {
            data[key] = findUser[key];
          }
        }
        res.json({
          status:'success',
          data: data,
        });
      } else {
        res.json({ status: "incorrect" });
      }
    } else {
      res.json({ status: "usernotfound" });
    }
    } catch (error) {
        console.log(error);
        res.status(500).json("server error")
    }
}



const uploadBlog = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { title,description, id } = req.body;
    const imagePath = `/public/${req.file.filename}`;  // Adjust the path as needed for your frontend

    console.log(title, id, imagePath);  // Debugging info

    const newImage = new Blog({
      title,
      image:imagePath,
      user_id: id,
      description
    });

    await newImage.save();
    res.status(201).json({ message: 'Blog uploaded successfully'});
  } catch (error) {
    console.error('Error uploading Blog:', error);
    res.status(500).json({ message: 'Error uploading Blog' });
  }
};


const fetchBlog=async(req,res)=>{
  try {
    const id=req.query.id
    console.log(id,'this is id');
    
    const fetch=await Blog.find({user_id:id})

    console.log(id,fetch);
    

    res.status(200).json({fetch:fetch})
  } catch (error) {
    console.error('Error ', error);
    res.status(500).json({ message: 'Error u' });
  }
}


const deleteBlog=async(req,res)=>{
  try {
    const id=req.query.id
    console.log(id,'detlete id');
    
   const deleteTheImage=await Blog.findByIdAndDelete({_id:id})
    res.status(201).json({message:'delete success'})
  } catch (error) {
    console.error('Error ', error);
    res.status(500).json({ message: 'Error' });
  }
}


const fetchsingleBlog=async(req,res)=>{
  try {
    const id=req.query.id
    console.log(id,'this is id');
    
    const fetch=await Blog.findOne({_id:id})

    console.log(id,fetch);
    
    res.status(200).json({fetch:fetch})
  } catch (error) {
    console.error('Error ', error);
    res.status(500).json({ message: 'Error u' });
  }
}



const updateBlog = async (req, res) => {
  try {
    const { id } = req.body;
    const { title, description } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    blog.title = title || blog.title;
    blog.description = description || blog.description;

  
    if (req.file) {
      const imagePath = `/public/${req.file.filename}`; 
      blog.image = imagePath;
    }

   
    await blog.save();

    res.status(200).json({ message: 'Blog updated successfully', blog });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ message: 'Error updating blog', error });
  }
};









module.exports={
    register,
    login,
    uploadBlog,
    fetchBlog,
    deleteBlog,
    fetchsingleBlog,
    updateBlog
}


