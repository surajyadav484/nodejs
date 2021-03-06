const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
  const productIndex = this.cart.items.findIndex(
    (cartProduct) => cartProduct.productId.toString() === product._id.toString()
  );
  let newQuantity = 1;
  let updatedCartItem = [...this.cart.items];
  //console.log(updatedCartItem);
  if (productIndex >= 0) {
    newQuantity = this.cart.items[productIndex].quantity + 1;
    updatedCartItem[productIndex].quantity = newQuantity;
  } else {
    updatedCartItem.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }

  const updatedCart = { items: updatedCartItem };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.deleteCartItem = function (productId) {
  const updatedCartItems = this.cart.items.filter(
    (cartItem) => cartItem.productId.toString() !== productId.toString()
  );
  this.cart.items = updatedCartItems;
  return this.save();
};
module.exports = mongoose.model("User", userSchema);

// const getDb = require("../util/database").getDb;
// const mongodb = require("mongodb");

// class User {
//   constructor(username, email, cart, id) {
//     this.username = username;
//     this.email = email;
//     this.cart = cart;
//     this._id = id;
//   }

//   save() {
//     const db = getDb();
//     return db.collection("users").insertOne(this);
//   }

//   addToCart(product) {
//     const productIndex = this.cart.items.findIndex(
//       (cartProduct) =>
//         cartProduct.productId.toString() === product._id.toString()
//     );
//     //console.log(productIndex);
//     let newQuantity = 1;
//     let updatedCartitems = [...this.cart.items];

//     if (productIndex >= 0) {
//       newQuantity = this.cart.items[productIndex].quantity + 1;
//       updatedCartitems[productIndex].quantity = newQuantity;
//     } else {
//       updatedCartitems.push({
//         productId: new mongodb.ObjectId(product._id),
//         quantity: newQuantity,
//       });
//     }

//     const updatedCart = {
//       items: updatedCartitems,
//     };
//     // const updatedCart = {
//     //   items: [{ productId: new mongodb.ObjectId(product._id), quantity: 1 }],
//     // };
//     const db = getDb();
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new mongodb.ObjectId(this._id) },
//         { $set: { cart: updatedCart } }
//       );
//   }

//   getCart() {
//     const db = getDb();
//     const productIds = this.cart.items.map((prod) => prod.productId);

//     return db
//       .collection("products")
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then((products) => {
//         return products.map((p) => {
//           return {
//             ...p,
//             quantity: this.cart.items.find((item) => {
//               return item.productId.toString() === p._id.toString();
//             }).quantity,
//           };
//         });
//       })
//       .catch((err) => console.log(err));
//   }

//   deleteCartItem(productId) {
//     const updatedCartItems = this.cart.items.filter(
//       (item) => item.productId.toString() !== productId.toString()
//     );
//     const db = getDb();
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new mongodb.ObjectId(this._id) },
//         { $set: { cart: { items: updatedCartItems } } }
//       );
//   }

//   addOrders() {
//     const db = getDb();
//     return this.getCart()
//       .then((products) => {
//         const order = {
//           items: products,
//           user: { _id: new mongodb.ObjectId(this._id), name: this.username },
//         };
//         return db.collection("orders").insertOne(order);
//       })
//       .then((result) => {
//         this.cart = { items: [] };
//         const db = getDb();
//         return db
//           .collection("users")
//           .updateOne(
//             { _id: new mongodb.ObjectId(this._id) },
//             { $set: { cart: { items: [] } } }
//           );
//       })
//       .catch((err) => console.log(err));
//   }

//   getOrders() {
//     const db = getDb();
//     return db
//       .collection("orders")
//       .find({ "user._id": new mongodb.ObjectId(this._id) })
//       .toArray();
//   }

//   static findUserById(userId) {
//     const db = getDb();
//     return db
//       .collection("users")
//       .find({ _id: new mongodb.ObjectId(userId) })
//       .next();
//   }
// }

// module.exports = User;
