const Product = require("../models/products.model");
const Provider = require("../models/providers.model");

/**
 * CRUD Products - Endpoint 1
 * [GET] http://localhost:3000/api/products 
 * Retorna un objeto con los datos de todos los productos. Retorna un status 200.
 * Usar populate() para que traiga los datos del proveedor de cada producto.
 */
const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    let products = id
      ? await Product.find({ id }, "-__v").populate("provider", '-__v')
      : await Product.find({}, "-__v").populate("provider", '-__v');
    res.status(200).json(products);
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

/**
 * CRUD Products - Endpoint 2
 * [POST] http://localhost:3000/api/products 
 * Se envía en el body los datos del producto a crear y retorna un status 201.
 * Payload {message: "producto creado", product:{datos_del_producto_creado}.
 * Primero tendréis que traer los datos del proveedor para obtener el ID_provider.
 * Después se podrá crear el producto.
 */
const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    
    // Check if provider exists
    if (!productData.providerName) {
      return res.status(400).json({ message: "Se requiere el nombre del proveedor" });
    }
    
    // Find provider by company name
    const provider = await Provider.findOne({ companyName: productData.providerName });
    
    if (!provider) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }
    
    // Remove providerName and assign provider ID
    delete productData.providerName;
    productData.provider = provider._id;
    
    // Create and save product
    const newProduct = await new Product(productData).save();
    
    res.status(201).json({
      message: "producto creado",
      product: await newProduct.populate('provider', '-__v')
    });
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

/**
 * CRUD Products - Endpoint 3
 * [PUT] http://localhost:3000/api/products 
 * Se envía en el body los datos del producto a editar y retorna un status 200.
 * Payload {message: "producto actualizado: zapatos", product:{datos_del_producto_editado}}
 */
const editProduct = async (req, res) => {
  try {
    const productData = req.body;
    
    // Check if title exists
    if (!productData.title) {
      return res.status(400).json({ message: "Se requiere el título del producto" });
    }
    
    // If providerName is provided, find provider and update provider ID
    if (productData.providerName) {
      const provider = await Provider.findOne({ companyName: productData.providerName });
      
      if (!provider) {
        return res.status(404).json({ message: "Proveedor no encontrado" });
      }
      
      // Replace providerName with provider ID
      delete productData.providerName;
      productData.provider = provider._id;
    }
    
    // Update product
    const updatedProduct = await Product.findOneAndUpdate(
      { title: productData.title },
      productData,
      { new: true }
    ).populate('provider', '-__v');
    
    if (!updatedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    
    res.status(200).json({
      message: `producto actualizado: ${updatedProduct.title}`,
      product: updatedProduct
    });
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

/**
 * CRUD Products - Endpoint 4
 * [DELETE] http://localhost:3000/api/products 
 * Se envía en el body el título del producto a borrar y retorna un status 200.
 * Payload {message: "Se ha borrado el producto: zapatos".
 */
const deleteProduct = async (req, res) => {
  try {
    const { title } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: "Se requiere el título del producto" });
    }
    
    const deletedProduct = await Product.findOneAndDelete({ title });
    
    if (!deletedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    
    res.status(200).json({ message: `Se ha borrado el producto: ${title}` });
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

module.exports = {
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
};
