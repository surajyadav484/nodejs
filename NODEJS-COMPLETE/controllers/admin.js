const { user } = require("pg/lib/defaults");
const Product = require("../models/product");
const mongoose = require("mongoose");

// const ObjectId = mongodb.ObjectId;

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

  Product.findById(prodId)
    //Product.findByPk(prodId)
    .then((product) => {
      //const product = products[0];
      if (!product) {
        return res.redirect("/");
      }
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
  const userId = req.user; //mongoose will automatically fetch Id and store it inside userID
  const product = new Product({
    title,
    price,
    description,
    imageUrl,
    userId,
  });
  product
    .save()
    .then((result) => {
      console.log("Values inserted successfully");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
//Another way of creating product with same user
//   Product.create({
//     title,
//     imageUrl,
//     price,
//     description,
//     userId: req.user.id,
//   })
//     .then((result) => {
//       console.log("Values inserted successfully");
//       res.redirect("/admin/products");
//     })
//     .catch((err) => console.log(err));
// };

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findById(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      return product.save();
    })
    .then((result) => {
      console.log("UPDATED PRODUCT!");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

// exports.postEditProduct = (req, res, next) => {
//   const { productId, title, imageUrl, description, price } = req.body;
//   const product = new Product(title, imageUrl, description, price, productId);

//   product
//     .save()
//     .then((product) => {
//       console.log("product updated successfully");
//       res.redirect("/admin/products");
//     })
//     .catch((err) => console.log(err));
// };

exports.getProducts = (req, res, next) => {
  Product.find()
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
  const id = req.body.productId;
  console.log(id);
  Product.findByIdAndRemove(id)
    .then((result) => {
      console.log("product deleted successfully");
      res.redirect("/admin/products");
    })
    .catch();
};
