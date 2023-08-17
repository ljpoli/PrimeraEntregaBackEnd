import express from "express";
import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js";
import currentDir from "./utils.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`/static`,express.static(`${currentDir}/public`))

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use('/api', cartsRouter); 
app.use("/api",productsRouter);

app.get("/", (req, res)  => {
  res.send("Servidor funcionando")
})  

app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port}`);
});
