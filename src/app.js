import express from "express";
import handlebars from "express-handlebars";
import currentDir from "./utils.js";
import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js";
import viewsRouter from "./routes/views.router.js"; 
import { Server } from "socket.io";
import { ProductManager } from "./managers/productManager.js"; 



const app = express();
const port = 8080;
const PM = new ProductManager("./src/data/products.json");


//#Handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", `${currentDir}/views`);

//#Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${currentDir}/public`));

//Routes
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use('/api', cartsRouter); 
app.use("/api",productsRouter);


// levanto el servidor en el puerto indicado
 const httpServer = app.listen(port, () =>{ 
   console.log(`Server ON - http://localhost:${port}`)
 });

 const io = new Server(httpServer);
 io.on("connection", (socket) => {
   console.log("Cliente conectado!!!");
 

  //obtengo todos los productos
   const products = PM.getProduct();
   socket.emit("realTimeProducts", products);

   //Escucho evento newProduct
   socket.on("newProduct", (data) => {
     const product = {
       title: data.title,
       description: data.description,
       code: data.code,
       price: data.price,
       status: "",
       stock: 10,
       category: "",
       thumbnails: data.thumbnails,
     };

     //creo el producto
     PM.addProduct(product);
     //obtengo todos los productos nuevamente
     const products = PM.getProduct();
     socket.emit("realTimeProducts", products);
   });

   //Escucho evento deleteProduct
   socket.on("deleteProduct", (data) => {
     PM.deleteProduct(parseInt(data));
     //obtengo todos los productos nuevamente
     const products = PM.getProduct();
     socket.emit("realTimeProducts", products);
    })
  })

