const Product = require("./product");
const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");

let p = path.join(rootDir, "data", "cart.json");

const products = [];

module.exports = class Cart {
  //get all the products from cart
  static addProductToCart(id) {
    let products = [];
    console.log("outside", products);
    fs.readFile(p, (err, fileContent) => {
      if (!err) {
        if (fileContent.length === 0) {
          console.log("file is empty");
          Product.getProductById(id, (product) => {
            products.push(product);
            console.log(product);
          });
        } else {
          console.log("file is not empty");
        }
      } else {
        console.log("file does not exist");
      }
    });
  }
};
