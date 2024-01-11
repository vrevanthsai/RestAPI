const mongoose= require("mongoose");

const connectDB=(uri)=>{
    return mongoose.connect(uri)
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));
};

module.exports= connectDB;