import express from "express";
import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js";
import _dirname from "./utils.js"

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`/static`,express.static(`${_dirname}/public`))

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.get("/", (req, res)  => {
  res.send("Servidor funcionando")
})  

app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port}`);
});
