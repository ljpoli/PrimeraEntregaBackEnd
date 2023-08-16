import express from "express";
import { CartManager } from "../cartManager.js";

const router = express.Router();
const cartManager = new CartManager("./data/carritos.json");

router.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json({ message: "Carrito creado exitosamente", cart: newCart });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el carrito" });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await cartManager.getCartById(cid);
    res.json(cart);
  } catch (error) {
    res.status(404).json({ error: "Carrito no encontrado" });
  }
});


router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity;
    await cartManager.addProductToCart(cid, pid, quantity);
    res.json({ message: "Producto agregado al carrito exitosamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
