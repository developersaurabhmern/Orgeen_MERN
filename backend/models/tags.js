const { Tag } = require('../schema/tag');
var ObjectId = require('mongodb').ObjectID;


async function addtag(reqdata) {
  try {
    const category = new Tag({
      name: reqdata.name,
      slug: reqdata.slug,
      description: reqdata.description,
      image: reqdata.image,
      created_at: new Date()
    });

    var response = await category.save();

    return response;

  } catch (err) {
    console.log("Errorqqqq=", err)
  }
}


//Get Tags
async function gettags() {
  try {
    var response = await Tag.find();
    return response;
  } catch (err) {
    console.log("Errorqqqq=", err)
    return 'error';
  }
}

// Delete Tags
async function deletetag(tagId) {
  try {
    var query = { "_id": ObjectId(tagId) };
    var response = await Tag.deleteOne(query);
    // console.log(response);return;
    // db.collection.remove(query);
    return response;
  } catch (err) {
    console.log("Errorqqqq=", err)
    return 'error';
  }
}

//get single tag
async function singletag(tagId) {
  try {
    // console.log(catId);return
    var response = await Tag.find({"_id": ObjectId(tagId)});
    return response;
  } catch (err) {
    console.log("Errorqqqq=", err)
    return 'error';
  }
}

//update tag
async function updatetag(fields, filename) {
  try {
    let tagdata = "";
    if(filename === ""){
      tagdata = {
        name: fields.name,
        slug: fields.slug,
        description: fields.description,
        updated_at: new Date()
      };
    }else{
      tagdata = {
        name: fields.name,
        slug: fields.slug,
        description: fields.description,
        image: filename,
        updated_at: new Date()
      };
    }
    
    
    var response = await Tag.updateOne({"_id": ObjectId(fields.tag_id)},{$set: tagdata});
    // console.log('tagdata', response);return;
    return response;

  } catch (err) {
    console.log("Errorqqqq=", err)
  }
}


module.exports = { addtag, gettags, deletetag, singletag, updatetag }