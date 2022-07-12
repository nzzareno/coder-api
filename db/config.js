const mongoose = require("mongoose");

 mongoose
  .connect("mongodb+srv://nacho:nacho123@codercluster.ydctggz.mongodb.net/mvc-coder?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });


  module.exports = mongoose;