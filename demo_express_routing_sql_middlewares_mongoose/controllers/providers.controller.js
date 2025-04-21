const Provider = require("../models/providers.model");
const Product = require("../models/products.model");

/**
 * CRUD Provider - Endpoint 1
 * [GET] http://localhost:3000/api/providers
 * Retorna un objeto con los datos de todos los providers. Retorna un status 200.
 */
const getProviders = async (req, res) => {
  try {
    const providers = await Provider.find({}, "-__v");
    res.status(200).json(providers);
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

/**
 * CRUD Provider - Endpoint 2
 * [POST] http://localhost:3000/api/providers
 * Se envía en el body los datos del proveedor a crear y retorna un status 201.
 * Payload {message: "proveedor creado", provider:{datos_del_proveedor_creado}}.
 */
const createProvider = async (req, res) => {
  try {
    const providerData = req.body;
    const newProvider = await new Provider(providerData).save();
    res.status(201).json({ 
      message: "proveedor creado", 
      provider: newProvider 
    });
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

/**
 * CRUD Provider - Endpoint 3
 * [PUT] http://localhost:3000/api/providers
 * Se envía en el body los datos del proveedor a editar y retorna un status 200.
 * Payload {message: "proveedor actualizado: Adidas", provider:{datos_del_proveedor_editado}}.
 */
const updateProvider = async (req, res) => {
  try {
    const providerData = req.body;
    
    // Check if companyName exists
    if (!providerData.companyName) {
      return res.status(400).json({ message: "Se requiere el nombre de la compañía" });
    }
    
    const updatedProvider = await Provider.findOneAndUpdate(
      { companyName: providerData.companyName },
      providerData,
      { new: true }
    );
    
    if (!updatedProvider) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }
    
    res.status(200).json({ 
      message: `proveedor actualizado: ${updatedProvider.companyName}`, 
      provider: updatedProvider 
    });
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

/**
 * CRUD Provider - Endpoint 4
 * [DELETE] http://localhost:3000/api/providers
 * Se envía en el body el título del proveedor a borrar y retorna un status 200.
 * Payload {message: "Se ha borrado el proveedor: Nintendo"}.
 * 
 * NOTA: Se verifica si el proveedor tiene productos relacionados. Si tiene productos,
 * se impide la eliminación para mantener la integridad referencial.
 */
const deleteProvider = async (req, res) => {
  try {
    const { companyName } = req.body;
    
    if (!companyName) {
      return res.status(400).json({ message: "Se requiere el nombre de la compañía" });
    }
    
    // Check if there are products associated with this provider
    const provider = await Provider.findOne({ companyName });
    
    if (!provider) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }
    
    const products = await Product.find({ provider: provider._id });
    
    if (products.length > 0) {
      return res.status(400).json({ 
        message: "No se puede eliminar el proveedor porque tiene productos asociados",
        productsCount: products.length
      });
    }
    
    await Provider.findOneAndDelete({ companyName });
    
    res.status(200).json({ message: `Se ha borrado el proveedor: ${companyName}` });
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

module.exports = {
  getProviders,
  createProvider,
  updateProvider,
  deleteProvider
}; 