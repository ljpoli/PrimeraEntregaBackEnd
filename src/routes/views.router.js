import { Router } from "express";
import ProductManager from "../managers/productManager.js";

const router = Router();
const PM = new ProductManager("./src/data/products.json");

router.get("/", (req, res) => {
  const products = PM.getProduct();

  res.render("home", { products, title: "Home" });
});

router.get("/realtimeproducts", (req, res) => {
  const products = PM.getProduct();
  res.render("realTimeProducts", { title: "Real Time Products" });
});

export default router;
