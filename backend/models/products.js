const { Product } = require('../schema/product');
const { Tag } = require('../schema/tag');
var ObjectId = require('mongodb').ObjectID;
const mongoose = require('mongoose');


async function addproduct(fields, filename) {
    try {
        var tags = fields.tag.split(",");
        // console.log(array);return;
        // console.log('product data', fields.discount_percen); return;
        if (fields.discount_percen == "") {
            fields.discount_percen = 0;
        }
        if (fields.discount_rupee == "") {
            fields.discount_rupee = 0;
        }
        const productData = new Product({
            name: fields.name,
            slug: fields.slug,
            category: ObjectId(fields.category),
            tag: tags,
            sale_price: parseFloat(fields.sale_price),
            discount_percen: parseFloat(fields.discount_percen),
            discount_rupee: parseFloat(fields.discount_rupee),
            offer_price: parseFloat(fields.offer_price),
            stock_status: fields.stock_status,
            product_desc: fields.product_desc,
            image: filename,
            created_at: new Date()
        });

        var response = await productData.save();
        return response;
    } catch (err) {
        console.log("Errorqqqq=", err)
    }
    // Product

}

async function getproducts() {
    // let products = await Product.find();
    let products = await Product.aggregate([
        {
            $lookup:
            {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category"
            }
        },
        { $unwind: "$category" }
    ])

    return products;
}

//Get single product
async function getproduct(pid) {
    try {
        var response = await Product.find({ "_id": ObjectId(pid) });
        return response;
    } catch (err) {
        console.log("Errorqqqq=", err)
    }
}

//Delete product
async function deleteproduct(pid) {
    try {
        var query = { "_id": ObjectId(pid) };
        var response = await Product.deleteOne(query);
        return response;
    } catch (err) {
        console.log("Errorqqqq=", err)
    }
}
//Get single product web
async function getproductweb(pid) {
    try {
        let response = await Product.aggregate([
            {
                $lookup:
                {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
                },
            },
            { $unwind: "$category" },
            {
                $match: { "_id": ObjectId(pid) }
            }
        ]);
        let modifiedArr = response.map(async function (element) {
            var response2 = await Tag.find({ _id: { $in: element.tag } });
            return response2;
        });
        var modArray = await Promise.allSettled(modifiedArr)
        for (let i = 0; i < modArray.length; i++) {
            response[i].tag = modArray[i].value;
        }
        return response;
    } catch (err) {
        console.log("Errorqqqq=", err)
    }
}
//Update product
async function updateproduct(fields, filename) {
    try {
        let productdata = "";
        var tags = fields.tag.split(",");
        if (filename == "") {
            productdata = {
                name: fields.name,
                slug: fields.slug,
                category: ObjectId(fields.category),
                tag: tags,
                sale_price: fields.sale_price,
                discount_percen: fields.discount_percen,
                discount_rupee: fields.discount_rupee,
                offer_price: fields.offer_price,
                stock_status: fields.stock_status,
                product_desc: fields.product_desc,
                updatet_at: new Date()
            };
        } else {
            productdata = {
                name: fields.name,
                slug: fields.slug,
                category: ObjectId(fields.category),
                tag: tags,
                sale_price: fields.sale_price,
                discount_percen: fields.discount_percen,
                discount_rupee: fields.discount_rupee,
                offer_price: fields.offer_price,
                stock_status: fields.stock_status,
                product_desc: fields.product_desc,
                image: filename,
                update_at: new Date()
            };
        }


        var response = await Product.updateOne({ "_id": ObjectId(fields.pid) }, { $set: productdata });
        // console.log('productdata', response); return;
        return response;

    } catch (err) {
        console.log("Errorqqqq=", err)
    }
}

async function getproductsweb() {
    try {
        // var response = await Product.find();
        let products = await Product.aggregate([
            {
                $lookup:
                {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
                },
            },
            { $unwind: "$category" },
            { $limit: 8 }
        ]);
        return products;
    } catch (err) {
        console.log("Errorqqqq=", err)
        return 'error';
    }
}

//Get saerch proiduct
async function getsearchproducts(request) {
    try {
        // var response = await Product.find();
        if (request === null) {
            request = "";
        }
        let response = await Product.aggregate([
            {
                $lookup:
                {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
                },
            },
            { $unwind: "$category" },
            {
                $match: { $or: [{ "name": new RegExp(request, 'i') }, { "category.name": new RegExp(request, 'i') }] },
            }
        ]);
        // console.log(response.length); return;
        return response;
    } catch (error) {
        console.log('error ', error);
    }
}

async function searchbypricecategory(request) {
    try {
        console.log(request.category);
        if (request.minPrice === null || request.minPrice == "") {
            request.minPrice = 0;
        }
        if (request.maxPrice === null || request.maxPrice == "") {
            request.maxPrice = 999999999999999
        }
        if (request.category === null || request.category == "" || request.category === undefined) {
            var test = { $ne: [] }
        } else {
            var catArray = request.category.split(",");
            let objectIdArray = catArray.map(s => mongoose.Types.ObjectId(s));
            var test = { $in: objectIdArray }
        }


        // console.log( doc );return

        let response = await Product.aggregate([
            {
                $lookup:
                {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
                },
            },
            { $unwind: "$category" },
            {
                $match: { "offer_price": { $gte: request.minPrice, $lte: request.maxPrice }, "category._id": test },
                // $match: { "category._id": test },
            }
        ]);
        // console.log('response ', response.length);
        return response;
    } catch (error) {
        console.log('error ', error);
    }
}

module.exports = { addproduct, getproducts, getproduct, deleteproduct, updateproduct, getproductsweb, getproductweb, getsearchproducts, searchbypricecategory }