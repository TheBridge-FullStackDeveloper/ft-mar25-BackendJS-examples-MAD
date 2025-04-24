const Product = require("../models/products.model");
const Provider = require("../models/providers.model");

async function createProduct({
  id,
  title,
  price,
  description,
  image,
  companyName,
}) {
  const provider = await Provider.find({ companyName });
  const provider_id = provider[0]._id.toString();

  const product = new Product({
    id,
    title,
    price,
    description,
    image,
    provider: provider_id,
  });

  const result = await product.save();
  console.log(result);
}

async function getProduct(id) {
  try {
    let products = id
      ? await Product.find({ id }, "-_id -__v").populate(
          "provider",
          "-_id -__v"
        )
      : await Product.find({}, "-_id -__v").populate("provider", "-_id -__v"); //{}
    return products;
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
  }
}

module.exports = {
  createProduct,
  getProduct,
  // editProduct,
  // deleteProduct
};
/* 
createProduct(
  7,
  "Tortilla de calabaza",
  1.5,
  "Cafe jugosa del teatro",
  "https://www.recetasderechupete.com/wp-content/uploads/2020/11/Tortilla-de-patatas-4-1200x828.jpg",
  "La casa de las flores"
);

//crear otro pruducto para la casa de las plantas
createProduct(
  2,
  "Ensalada de tomate",
  2.5,
  "Cafe jugosa del teatro",
  "https://www.recetasderechupete.com/wp-content/uploads/2020/11/Tortilla-de-patatas-4-1200x828.jpg",
  "La casa de las plantas"
); */

// getProduct(7).then(data=>console.log(data));
