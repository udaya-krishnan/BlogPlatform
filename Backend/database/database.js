const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
       "mongodb+srv://udayankrishnan36:zpFT9h4F9GMddnU9@blogplatform.jaz4n.mongodb.net/BlogPlatform?retryWrites=true&w=majority&appName=Blogplatform",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        tls: true, // Ensure TLS is enabled
        serverSelectionTimeoutMS: 30000, // Adjust timeout
        socketTimeoutMS: 45000,         // Adjust socket timeout
      
      }
    ); 
    console.log('Database connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit the application if DB connection fails
  }
};

module.exports = connectDB;
