// include .env 
require("dotenv").config();
const express=require("express");
var path = require('path');
const app=express();
const PORT=process.env.PORT || 5000;
// import routes
const products_routes=require("./routes/product");
// connect to db
const connectDB=require("./db/connect");
// import productModel
const Product=require('./models/product');
// import cors
const cors=require("cors");
app.use(cors({
    origin:"*",
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// linking stylesheets
app.use(express.static(path.join(__dirname, 'public')));
// to access req.body from admin form
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/",(req,res)=>{
    res.render("admin");
});

app.get("/admin",(req,res)=>{
    res.render("admin");
})
// to see(Read) all products
app.get("/alldata",async (req,res)=>{
    const productData=await Product.find({})
    res.render("success",{productData});
})
// to Delete(D) a product
app.post('/deleteone',async(req,res)=>{
    let deleteProduct=await Product.findOneAndDelete({
        name: req.body.deleteone
    })
    // to Delete(D) all data
    // await Product.deleteMany();
    console.log(deleteProduct);
    res.send(`${req.body.deleteone} product deleted from Database successfully and go to All data(/alldata) page to see all products `);
})
// to Updata field's value by its Object-ID
// app.post('/updatebyid',async(req,res)=>{
//     await Product.findByIdAndUpdate(req.body.objectid,{name: req.body.updatevalue},{new:true} ,(err,data)=>{
//         if(err){
//             return res.status(500).send(err);
//         }else{
//             return res.status(200).send(data);
//         }
//     })
// })
app.post('/updatebyid',async(req,res)=>{
    await Product.findByIdAndUpdate(req.body.objectid,{name: req.body.updatevalue})
    // console.log(req.body.updatevalue)
    res.send(`successfully name changed(updated) to ${req.body.updatevalue} and go to All data(/alldata) page to see all products `);
})


// to setup routes
// combine way of routes and controllers to create a route with json
app.use("/api/products",products_routes);

const start=async ()=>{
    try{
        await connectDB(process.env.MONGODB_URI);
        app.listen(PORT,()=>{
            console.log(`Server Connect at ${PORT}`);
        })
    }catch(error){
        console.log(error);
    }
}

start();
