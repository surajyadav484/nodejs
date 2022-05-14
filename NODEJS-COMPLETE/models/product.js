const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);

// const getDb = require("../util/database").getDb;
// const mongodb = require("mongodb");

// class Product {
//   // constructor(title, imageUrl, price, description, id) {
//   //   this.title = title;
//   //   this.imageUrl = imageUrl;
//   //   this.price = price;
//   //   this.description = description;
//   //   this._id = new mongodb.ObjectId(id);
//   // }

//   // save() {
//   //   const db = getDb();
//   //   let dbOp;
//   //   if (this._id) {
//   //     console.log("this._id", this._id);
//   //     dbOp = db
//   //       .collection("products")
//   //       .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
//   //   } else {
//   //     dbOp = db.collection("products").insertOne(this);
//   //   }

//   //   return dbOp
//   //     .then((result) => {
//   //       console.log(result);
//   //     })
//   //     .catch((err) => console.log(err));
//   // }

//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       // Update the product
//       dbOp = db
//         .collection("products")
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOp = db.collection("products").insertOne(this);
//     }
//     return dbOp
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static fetchAllProducts() {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((result) => {
//         return result;
//       })
//       .catch((err) => console.log(err));
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find({ _id: new mongodb.ObjectId(prodId) })
//       .next()
//       .then((result) => {
//         return result;
//       })
//       .catch((err) => console.log(err));
//   }
//   static deleteProductById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .deleteOne({ _id: new mongodb.ObjectId(prodId) })
//       .then((result) => {
//         console.log(err);
//       })
//       .catch((err) => console.log(err));
//   }
// }

// module.exports = Product;
