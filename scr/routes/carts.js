import express from "express";
import CartManager from "../managers/cartManger.js"; 

const router = express.Router();
const manager = new CartManager("./data/productos.json");

router.get("/carts", async (req, res) => {
  try {
    const carts = await manager.getCarts();
    res.json({ status: "success", carts });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al obtener los carritos." });
  }
});

router.get("/carts/:cid", async (req, res) => {
  try {
    const cid = parseInt(req.params.cid);
    const carritofound = await manager.getCartbyId({ cid }); 
    if (typeof carritofound === "object") {
      res.json({ status: "success", carritofound });
    } else {
      res.status(404).json({ status: "error", message: "Carrito no encontrado." });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al obtener el carrito." });
  }
});

router.post("/carts/", async (req, res) => {
  try {
    console.log("Adding a new cart...");
    await manager.addCart();
    res.json({ status: "success", message: "Carrito creado exitosamente." });
  } catch (error) {
    console.error("Error adding cart:", error);
    res.status(500).json({ status: "error", message: "Error al crear el carrito." });
  }
});

router.post("/carts/:cid/products/:pid", async (req, res) => {
  try {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);

    console.log(`Adding product with ID ${pid} to cart with ID ${cid}...`);
    await manager.addProductToCart(cid, pid);
    res.json({ status: "success", message: "Producto agregado al carrito exitosamente." });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ status: "error", message: "Error al agregar el producto al carrito." });
  }
});


export default router;
