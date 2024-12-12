import express, { urlencoded } from "express";
import ProductController from "./src/controllers/product.controller.js";
import path from "path";
// import elsLayout from "express-ejs-layouts";
import expressEjsLayouts from "express-ejs-layouts";
import validateRequest from "./src/middlewares/validation.middleware.js";
import { uploadFile } from "./src/middlewares/file-upload.middleware.js";
import { auth } from "./src/middlewares/auth.middleware.js";
import UserController from "./src/controllers/user.controller.js";
import validationRegister from "./src/middlewares/validationRegister.middleware.js";
import session from "express-session";

const server = express();

//parse the data
server.use(express.urlencoded({ extended: true }));

//setup view engine setting
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(expressEjsLayouts);

server.use(express.static("public"));

server.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

//create an instance of product controller
const productController = new ProductController();
const userController = new UserController();

server.get("/register", userController.getRegister);
server.get("/login", userController.getLogin);
server.post("/login", userController.postLogin);
server.post("/register", validationRegister, userController.postRegister);
server.post("/logout", userController.logout);

server.get("/", auth, productController.getProducts);
server.get("/add-product", auth, productController.getAddProduct);
server.get("/update-product:id", auth, productController.getUpdateProductView);
server.post("/delete-product:id", auth, productController.deleteProduct);
server.post(
  "/",
  auth,
  uploadFile.single("imageUrl"),
  validateRequest,
  productController.postAddProduct
);
server.post("/update-product", auth, productController.postUpdateProduct);

server.use(express.static("src/views"));

server.listen(3400);

console.log("Server is running on port 3400");
