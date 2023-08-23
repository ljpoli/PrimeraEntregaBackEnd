import express from "express";
import { ProductManager } from "../managers/productManager.js";  

const router = express.Router();
const productManager = new ProductManager("./data/productos.json");

router.get("/", async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productManager.getProduct();

    if (limit) {
      const limitedProducts = products.slice(0, parseInt(limit, 10));
      return res.json(limitedProducts);
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const pid = parseInt(req.params.pid, 10);
    const product = await productManager.getProductById(pid);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = req.body;
    const newProductId = await productManager.generateId(); // Generar un nuevo ID único
    product.id = newProductId; // Asignar el nuevo ID al producto
    const newProduct = await productManager.addProduct(product);
    res.status(201).json({ message: "Producto creado exitosamente", product: newProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



router.put("/:pid", async (req, res) => {
  try {
    const pid = parseInt(req.params.pid, 10);
    const updatedFields = req.body;
    await productManager.updateProduct(pid, updatedFields);
    res.json({ message: "Producto actualizado exitosamente" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const pid = parseInt(req.params.pid, 10);
    await productManager.deleteProduct(pid);
    res.json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default router;
