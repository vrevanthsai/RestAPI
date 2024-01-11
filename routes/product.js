const express=require("express");
const router=express.Router();
// import 2 functions
const {getAllProducts,getAllProductsTesting}=require("../controllers/product");
// import post function(start function) from productDB.js
const start = require("../productDB");

// live testing
router.route("/").get(getAllProducts);
// Postman testing
router.route("/testing").get(getAllProductsTesting);

// Post router
router.route("/post").post(start);

module.exports=router;