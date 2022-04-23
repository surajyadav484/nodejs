const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.getEditProduct = (req, res, next) => {
  let editMode = req.query.edit;
  let prodId = req.params.productId;

  Product.findByPk(prodId)
    .then((product) => {
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product,
      });
    })
    .catch((err) => console.log(err));
  // Product.getProductById( );
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  Product.create({
    title,
    imageUrl,
    price,
    description,
  })
    .then((result) => {
      console.log("Values inserted successfully");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, imageUrl, description, price } = req.body;
  //console.log(productId, title, imageUrl, description, price);
  //const product = new Product(productId, title, imageUrl, description, price);

  Product.findByPk(productId)
    .then((product) => {
      product.id = productId;
      product.title = title;
      product.imageUrl = imageUrl;
      product.description = description;
      product.price = price;

      return product.save();
    })
    .then((product) => {
      console.log("product updated successfully");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
  //Product.fetchAll();
};

exports.postDeleteProduct = (req, res, next) => {
  const id = req.body.prodId;
  Product.destroy({ where: { id: id } })
    .then((result) => {
      console.log("product deleted successfully");
      res.redirect("/admin/products");
    })
    .catch();
};
