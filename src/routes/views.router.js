import { Router } from "express";
import { ProductManager } from "../managers/productManager.js";

 const router = Router();
 const PM = new ProductManager();

router.get("/", (req, res) => {
  const products = PM.getProduct();
  res.render("home", { products, title: "Home" });
});

router.get("/realtimeproducts", (req, res) => {
  const products = PM.getProduct(); 
  res.render("realTimeProducts", { products, title: "Real Time Products" }); 
});

export default router;
