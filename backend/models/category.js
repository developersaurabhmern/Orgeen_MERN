const { Category } = require('../schema/category');
var ObjectId = require('mongodb').ObjectID;


async function addcategory(reqdata) {
  try {
    const category = new Category({
      name: reqdata.name,
      slug: reqdata.slug,
      description: reqdata.description,
      image: reqdata.image,
      created_at: new Date()
    });

    var response = await category.save();
    // console.log("category", response);return false;
    // var response = await category.save().then(result => {
    //   if (!result) {
    //     return 'Error Creating Category';
    //     //   res.status(500).json({
    //     //     message: "Error Creating User"
    //     //   })
    //   }
    //   return result;
    //   // res.status(201).json({
    //   //   message: "User created!",
    //   //   result: result
    //   // });
    // })

    return response;

  } catch (err) {
    console.log("Errorqqqq=", err)
  }
}
//Get category
async function getcategory() {
  try {
    var response = await Category.find();
    return response;
  } catch (err) {
    console.log("Errorqqqq=", err)
    return 'error';
  }
}

async function getcategorydata() {
  try {
    var response = await Category.find();
    return response;
  } catch (err) {
    console.log("Errorqqqq=", err)
    return 'error';
  }
}

async function updatecategory(fields, filename) {
  try {
    let category = "";
    if(filename === ""){
      category = {
        name: fields.name,
        slug: fields.slug,
        description: fields.description,
        updated_at: new Date()
      };
    }else{
      category = {
        name: fields.name,
        slug: fields.slug,
        description: fields.description,
        image: filename,
        updated_at: new Date()
      };
    }
    
    
    var response = await Category.updateOne({"_id": ObjectId(fields.cat_id)},{$set: category});
    // console.log('category', response);return;
    return response;

  } catch (err) {
    console.log("Errorqqqq=", err)
  }
}

//Get category
async function singlecategory(catId) {
  try {
    // console.log(catId);return
    var response = await Category.find({"_id": ObjectId(catId)});
    return response;
  } catch (err) {
    console.log("Errorqqqq=", err)
    return 'error';
  }
}

//Delete Category
async function deletecategory(catId) {
  try {
    // console.log(catId);return 
    var query = { "_id": ObjectId(catId) };
    var response = await Category.deleteOne(query);
    return response;
  } catch (err) {
    console.log("Errorqqqq=", err)
    return 'error';
  }
}


module.exports = { addcategory, getcategory, deletecategory, singlecategory, updatecategory, getcategorydata }