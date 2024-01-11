require('dotenv').config();
const connectDB=require('./db/connect');
const Product=require('./models/product');

const start= async(req,res) => {
    try {
        await connectDB(process.env.MONGODB_URI);
        // to Delete(D) all data
        // await Product.deleteMany();
        // Create opertion(C)
        await Product.create({
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            price: req.body.price,
            price_id: req.body.priceid, 
            company: req.body.company
        })
        .then(function(){
            res.redirect("/alldata");
        })
        // console.log(req.body.name);
        console.log("successfully DataBase created");
        // res.render("success",{ success: "Successfully Data added" });
    } catch (error) {
        console.log(error);
    }
}

// start();
module.exports= start;

// run these file to save data-objects in DB(altas) as node productDB.js
