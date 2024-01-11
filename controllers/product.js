// import model for CRUD OPERATIONS
const Product=require('../models/product');

// /api/products/ route with 3 data-fields-- name,image,description 
const getAllProducts= async (req,res) => {
    const myData = await Product.find(req.query).select('name image description'); 
    res.status(200).json(await myData);
}

// /api/products/testing with all data-fields 
const getAllProductsTesting= async (req,res) => {
    
    const {company,name,_id}=req.query;
    const queryObject={};
    
    if(company){
        queryObject.company={$regex:company,$options:"i"};
    }
    if(name){
        queryObject.name={$regex:name,$options:"i"}; 
    }
    if(_id){
        queryObject._id=_id;
    }

    const {sort}=req.query;
    // READ OPERATION(R)
    let apiData=Product.find(queryObject);

    if(sort){
        let sortFix=sort.replace(","," ");
        apiData=apiData.sort(sortFix);
    }

    const {select}=req.query;
    if(select){
        let selectFix=select.split(",").join(" ");
        apiData=apiData.select(selectFix);
    }

    // create 3 variables for pagination formula
    let page=Number(req.query.page) || 1 ;
    let limit=Number(req.query.limit) || 10 ;
    // Pagination formula
    let skip=(page-1)*limit;
    apiData=apiData.skip(skip).limit(limit);

    // showing data in json formate
    res.status(200).json(await apiData);
}

module.exports={getAllProducts,getAllProductsTesting};