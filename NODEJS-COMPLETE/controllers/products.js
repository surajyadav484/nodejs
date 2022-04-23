const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  console.log("req.body.title", req.body.title);
  product.saveProduct();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.findAll().then((products) => {
    console.log(products);
    res
      .render("shop/shop", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true,
      })
      .catch((err) => console.log(err));
    //Product.fetchAllProducts();
  });
};
