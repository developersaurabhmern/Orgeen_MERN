const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
// const formidable = require("formidable");
var bodyParser = require('body-parser');
const db = require("./db/db")
const header_middleware = require("./middlewares/header")
const cors = require("cors");



const postRouter = require("./Routes/post");
const userRoutes = require("./Routes/user");
const profileRoutes = require("./Routes/profile");
const dashboardRoutes = require("./controller/dashboard");

const { saveCategory, getCategory, deleteCategory, singleCategory, updateCategory, getCategoryData } = require("./controller/category");
const { saveTags, getTags, deleteTags, getSingleTags, updateTags } = require("./controller/tags");
const { addProducts, getProducts, getProduct, deleteProduct, updateProduct, getProductsWeb, getProductSingleWeb, getProductSearchByKey, searchByPriceCategory } = require("./controller/products");


const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const formidable = require("formidable");
const { log } = require("console");

const PORT = process.env.PORT || 3001

// app.use(formidable());
app.use(express.json())
app.use(header_middleware)
const directory = path.join(__dirname, './images');
app.use("/images", express.static(directory));
// app.use("/", express.static(path.join(__dirname, 'angular')));

app.use("/api/posts", postRouter)
app.use("/api/user", userRoutes);
app.use("/api/profile", profileRoutes);
// app.use("/api/dashboard", dashboardRoutes);

//Category API's
app.use("/api/dashboard/savecat", saveCategory);
app.get("/api/dashboard/gatcategory", getCategory);
app.post("/api/dashboard/singlecategory", singleCategory);
app.post("/api/dashboard/updatecategory", updateCategory);
app.post("/api/dashboard/deletecategory", deleteCategory);
app.get("/api/category/get", getCategoryData);

//Tags API's
app.post("/api/tags/add", saveTags);
app.get("/api/tags/get", getTags);
app.post("/api/tags/delete", deleteTags);
app.post("/api/tags/singletag", getSingleTags);
app.post("/api/tags/updatetag", updateTags);
//Products API's
app.post("/api/products/add", addProducts);
app.get("/api/products/get", getProducts);
app.post("/api/products/get/id", getProduct);
app.post("/api/products/delete", deleteProduct);
app.post("/api/products/update", updateProduct);

//For website
app.get("/api/product/get", getProductsWeb);
app.post("/api/product/get/id", getProductSingleWeb);
app.post("/api/product/search", getProductSearchByKey);
app.post("/api/product/searchprice", searchByPriceCategory);




app.get('/', (req, res) => {
  res.send('<h2>Hello World!</h2>')
})

// app.use((req, res, next) => {
//     res.sendFile(path.join(__dirname, "angular", "index.html"))
// });
app.listen(PORT, (req, res) => {
  console.log(`app is listening to PORT ${PORT}`)
})