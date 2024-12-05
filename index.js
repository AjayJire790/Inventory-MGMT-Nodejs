import express, { urlencoded } from "express";
import ProductController from "./src/controllers/product.controller.js";
import path from "path";
// import elsLayout from "express-ejs-layouts";
import expressEjsLayouts from "express-ejs-layouts";
import validateRequest from "./src/middlewares/validation.middleware.js";
import { uploadFile } from "./src/middlewares/file-upload.middleware.js";

const server = express();

//parse the data
server.use(express.urlencoded({ extended: true }));

//setup view engine setting
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(expressEjsLayouts);

server.use(express.static("public"));

//create an instance of product controller
const productController = new ProductController();

server.get("/", productController.getProducts);
server.get("/add-product", productController.getAddForm);
server.get("/update-product:id", productController.getUpdateProductView);

server.post("/delete-product:id", productController.deleteProduct);
server.post(
  "/",
  validateRequest,
  uploadFile.single("imageUrl"),
  productController.postAddProduct
);
server.post("/update-product", productController.postUpdateProduct);

server.use(express.static("src/views"));

server.listen(3400);

console.log("Server is running on port 3400");
