// const express = require('express')
const checkAuth = require("../middlewares/check-auth");
const { addcategory, getcategory, deletecategory, singlecategory, updatecategory, getcategorydata } = require('../models/category');
// const multer = require("multer");
const formidable = require("formidable");
const path = require("path");

const fs = require('fs');
// const { exit } = require("process");
// const form = formidable({ multiples: true });

// var inputFields = {};


const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/gif": "gif"
};


async function saveCategory(req, res) {
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
                var newPath = path.join(__dirname, '../images/category')
                    + '/' + name + "-" + Date.now() + "." + ext;
                var filename = '/category/' + name + "-" + Date.now() + "." + ext;
                var rawData = fs.readFileSync(oldPath)
                // console.log(__dirname);return
                fs.writeFile(newPath, rawData, function (err) {
                    if (err) console.log(err)
                    // return res.send("Successfully uploaded")
                })
            } else {
                var filename = ""
            }



            var reqdata = {
                name: fields.name,
                slug: fields.slug,
                description: fields.description,
                image: filename
            }

            let modData = await addcategory(reqdata);
            if (typeof modData != "undefined") {
                res.status(200).json({ message: "Category added successfully!" });
            } else {
                // res.status(500).json({message: "Error Creating Category"});
                res.status(500).json({ message: "Slug can't be duplicate!" });
            }
        });

        // await console.log('reqdata ', form, "files "); return false;


    } catch (error) {
        console.log("err=", error);
    }
}




//Get Category
async function getCategory(req, res) {
    try {
        checkAuth(req, res, function (err) { });

        let categoryData = await getcategory();
        // console.log("test ", categoryData);return;
        // return categoryData;
        if (categoryData === 'error') {
            res.status(404).json({ message: "Category not found" });
        } else {
            res.status(200).json({ data: categoryData, message: "All category" });
        }
    } catch (error) {
        console.log("err=", error);
    }

}

//Get single category
async function singleCategory(req, res) {
    try {
        checkAuth(req, res, function (err) { });
        const catId = req.body.cat_id
        let categoryData = await singlecategory(catId);

        if (categoryData === 'error') {
            res.status(404).json({ message: "Category not found" });
        } else {
            res.status(200).json({ data: categoryData, message: "category" });
        }
    } catch (error) {
        console.log("err=", error);
    }

}

//Update category
async function updateCategory(req, res) {
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
                var newPath = path.join(__dirname, '../images/category')
                    + '/' + name + "-" + Date.now() + "." + ext;
                var filename = '/category/' + name + "-" + Date.now() + "." + ext;
                var rawData = fs.readFileSync(oldPath)
                // console.log(__dirname);return
                fs.writeFile(newPath, rawData, function (err) {
                    if (err) console.log(err)
                    // return res.send("Successfully uploaded")
                })
            } else {
                var filename = ""
            }
            let modData = await updatecategory(fields, filename);
            // console.log('fields ', typeof modData.nModified);
            if (modData.nModified === 1) {
                res.status(200).json({ message: "Category updated successfully!" });
            } else {
                // res.status(500).json({message: "Error Creating Category"});
                res.status(500).json({ message: "Something went wrong!" });
            }
        });

        // await console.log('reqdata ', form, "files "); return false;


    } catch (error) {
        console.log("err=", error);
    }

}


// Delete Category
async function deleteCategory(req, res) {
    try {
        checkAuth(req, res, function (err) { });
        let catId = req.body.cat_id
        let deleteData = await deletecategory(catId);
        // console.log(deleteData);exit;
        if (deleteData === 'error') {
            res.status(404).json({ message: "Something went wrong!" });
        } else {
            res.status(200).json({ message: "Category deleted" });
        }
        // console.log(deleteData);
    } catch (error) {
        console.log("err=", error);
    }

}

async function getCategoryData(req, res) {
    try {
        let categoryData = await getcategorydata();
        // console.log("test ", categoryData);return;
        // return categoryData;
        if (categoryData === 'error') {
            res.status(404).json({ message: "Category not found" });
        } else {
            res.status(200).json({ data: categoryData, message: "All category" });
        }
    } catch (error) {
        console.log("err=", error);
    }
}

module.exports = { saveCategory, getCategory, deleteCategory, singleCategory, updateCategory, getCategoryData }
