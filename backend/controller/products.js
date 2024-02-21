const checkAuth = require("../middlewares/check-auth");
const { addproduct, getproducts, getproduct, deleteproduct, updateproduct, getproductsweb, getproductweb, getsearchproducts, searchbypricecategory } = require('../models/products');
// const multer = require("multer");
const formidable = require("formidable");
const path = require("path");

const fs = require('fs');

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/gif": "gif"
};

async function addProducts(req, res) {
    try {
        const form = formidable({});
        checkAuth(req, res, function (err) { });
        form.parse(req, async (err, fields, files) => {
            if (err) {
                next(err);
                return;
            }
            if (files.image != undefined) {
                const name = files.image.originalFilename.toLowerCase().split(" ").join("-");
                const ext = MIME_TYPE_MAP[files.image.mimetype];

                var oldPath = files.image.filepath;
                var newPath = path.join(__dirname, '../images/products')
                    + '/' + name + "-" + Date.now() + "." + ext;
                var filename = '/products/' + name + "-" + Date.now() + "." + ext;
                var rawData = fs.readFileSync(oldPath)
                // console.log(__dirname);return
                fs.writeFile(newPath, rawData, function (err) {
                    if (err) console.log(err)
                    // return res.send("Successfully uploaded")
                })
            } else {
                var filename = ""
            }
            var modData = await addproduct(fields, filename);
            res.status(200).json({ message: "Product added successfully!" });

        });
    } catch (error) {
        console.log("err=", error);
    }
}

//Get Product 
async function getProducts(req, res) {
    try {
        checkAuth(req, res, function (err) { });

        let productsData = await getproducts();
        if (productsData) {
            res.status(200).json({ message: 'All products', data: productsData })
        } else {
            res.status(501).json({ message: 'Data not found!' })
        }
    } catch (error) {
        console.log("err=", error);
    }
}

//Get single product
async function getProduct(req, res) {
    try {
        var pid = req.body.pid;
        let product = await getproduct(pid)
        // console.log('product ',product);return;
        if (product) {
            res.status(200).json({ message: 'Product Data', data: product })
        } else {
            res.status(501).json({ message: 'Data not found!' })
        }
    } catch (error) {
        console.log("err=", error);
    }

}

//Get single product web
async function getProductSingleWeb(req, res) {
    try {
        var pid = req.body.pid;
        let product = await getproductweb(pid)
        // console.log('product ',product);return;
        if (product) {
            res.status(200).json({ message: 'Product Data', data: product })
        } else {
            res.status(501).json({ message: 'Data not found!' })
        }
    } catch (error) {
        console.log("err=", error);
    }

}

//Delete product
async function deleteProduct(req, res) {
    try {
        var pid = req.body.pid;
        let product = await deleteproduct(pid)
        if (product === 'error') {
            res.status(404).json({ message: "Something went wrong!" });
        } else {
            res.status(200).json({ message: "Product deleted" });
        }
    } catch (error) {
        console.log("err=", error);
    }

}

//Update product
async function updateProduct(req, res) {
    try {
        const form = formidable({});
        checkAuth(req, res, function (err) { });
        form.parse(req, async (err, fields, files) => {
            if (err) {
                next(err);
                return;
            }
            if (files.image != undefined) {
                const name = files.image.originalFilename.toLowerCase().split(" ").join("-");
                const ext = MIME_TYPE_MAP[files.image.mimetype];

                var oldPath = files.image.filepath;
                var newPath = path.join(__dirname, '../images/products')
                    + '/' + name + "-" + Date.now() + "." + ext;
                var filename = '/products/' + name + "-" + Date.now() + "." + ext;
                var rawData = fs.readFileSync(oldPath)
                // console.log(__dirname);return
                fs.writeFile(newPath, rawData, function (err) {
                    if (err) console.log(err)
                    // return res.send("Successfully uploaded")
                })
            } else {
                var filename = ""
            }
            let modData = await updateproduct(fields, filename);
            // console.log('fields ', modData);return
            if (modData.n === 1) {
                res.status(200).json({ message: "Product updated successfully!" });
            } else {
                // res.status(500).json({message: "Error Creating Category"});
                res.status(500).json({ message: "Something went wrong!" });
            }
        });

    } catch (error) {
        console.log("err=", error);
    }
}

async function getProductsWeb(req, res) {
    try {
        var products = await getproductsweb();
        if (products.length > 0) {
            res.status(200).json({ data: products })
        } else {
            res.status(404).json({ 'message': 'Data not found' })
        }
        // console.log('oriductas', products);
    } catch (error) {
        console.log("err=", error);
    }
}

async function getProductSearchByKey(req, res) {
    try {
        let searchkey = req.body.searchkey;
        let product = await getsearchproducts(searchkey);
        if (product.length > 0) {
            res.status(200).json({ datalength: product.length, data: product })
        } else {
            res.status(404).json({ 'message': 'Products not found' })
        }
    } catch (error) {
        console.log('error ', error);
    }
}

async function searchByPriceCategory(req, res) {
    try {
        // console.log('req.body.category ', req.body);return
        let searchkey = { category: req.body.category, minPrice: req.body.minprice, maxPrice: req.body.maxprice }
        let product = await searchbypricecategory(searchkey);
        if (product.length > 0) {
            res.status(200).json({ datalength: product.length, data: product })
        } else {
            res.status(404).json({ 'message': 'Products not found' })
        }
    } catch (error) {
        console.log('error ', error);
    }
}

module.exports = { addProducts, getProducts, getProduct, deleteProduct, updateProduct, getProductsWeb, getProductSingleWeb, getProductSearchByKey, searchByPriceCategory }