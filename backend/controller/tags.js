const checkAuth = require("../middlewares/check-auth");
const { addtag, gettags, deletetag, singletag, updatetag } = require('../models/tags');
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
async function saveTags(req, res) {
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
                var newPath = path.join(__dirname, '../images/tags')
                    + '/' + name + "-" + Date.now() + "." + ext;
                var filename = '/tags/' + name + "-" + Date.now() + "." + ext;
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

            let modData = await addtag(reqdata);

            res.status(200).json({ message: "Tag added successfully!" });

        });

        // await console.log('reqdata ', form, "files "); return false;


    } catch (error) {
        console.log("err=", error);
    }
}

//Get tags
async function getTags(req, res) {
    try {
        checkAuth(req, res, function (err) { });

        let tagData = await gettags();
        // console.log("test ", categoryData);return;
        // return categoryData;
        if (tagData === 'error') {
            res.status(404).json({ message: "Tags not found" });
        } else {
            res.status(200).json({ data: tagData, message: "All Tags" });
        }

    } catch (error) {
        console.log("err=", error);
    }
}
//Delete tags
async function deleteTags(req, res) {
    try {
        checkAuth(req, res, function (err) { });
        let catId = req.body.tag_id
        let deleteData = await deletetag(catId);
        if (deleteData === 'error') {
            res.status(404).json({ message: "Something went wrong!" });
        } else {
            res.status(200).json({ message: "Tag deleted" });
        }
        // console.log(deleteData);
    } catch (error) {
        console.log("err=", error);
    }
}

//Get single tags
async function getSingleTags(req, res) {
    try {
        checkAuth(req, res, function (err) { });
        const tagId = req.body.tag_id
        let tagData = await singletag(tagId);

        if (tagData === 'error') {
            res.status(404).json({ message: "Tag not found" });
        } else {
            res.status(200).json({ data: tagData, message: "single tag data" });
        }
    } catch (error) {
        console.log("err=", error);
    }
}

//Update category
async function updateTags(req, res) {
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
                var newPath = path.join(__dirname, '../images/tags')
                    + '/' + name + "-" + Date.now() + "." + ext;
                var filename = '/tags/' +name + "-" + Date.now() + "." + ext;
                var rawData = fs.readFileSync(oldPath)
                // console.log(__dirname);return
                fs.writeFile(newPath, rawData, function (err) {
                    if (err) console.log(err)
                    // return res.send("Successfully uploaded")
                })
            } else {
                var filename = ""
            }
            let modData = await updatetag(fields, filename);
            // console.log('fields ', typeof modData.nModified);
            if (modData.nModified === 1) {
                res.status(200).json({ message: "Tag updated successfully!" });
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

module.exports = { saveTags, getTags, deleteTags, getSingleTags, updateTags }