import ProductModel from "../models/product.model.js";

export default class ProductController {
  getProducts(req, res, next) {
    // console.log(path.resolve());
    //Model
    let products = ProductModel.getAll();
    console.log(products);
    //View
    res.render("index", { products: products });
    // return res.sendFile(
    //   path.join(path.resolve(), "src", "views", "products.html")
    // );
  }

  getAddForm(req, res, next) {
    return res.render("add-product", { errorMessage: null });
  }

  postAddProduct(req, res, next) {
    ProductModel.add(req.body);
    var products = ProductModel.getAll();
    res.render("index", { products });
    // res.send();
  }

  getUpdateProductView(req, res, next) {
    const id = req.params.id;
    let productFound = ProductModel.getByid(id);
    if (productFound) {
      res.render("update-product", {
        product: productFound,
        errorMessage: null,
      });
    } else {
      res.status(401).send("Product not found");
    }
  }

  postUpdateProduct(req, res, next) {
    ProductModel.update(req.body);
    var products = ProductModel.getAll();
    res.render("index", { products });
  }

  deleteProduct(req, res, next) {
    const id = req.params.id;
    ProductModel.delete(id);
    var products = ProductModel.getAll();
    if (!products) {
      return res.status(401).send("Product not Found!");
    }
    res.render("index", { products });
  }
}
