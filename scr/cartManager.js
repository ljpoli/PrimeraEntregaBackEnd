import fs from "fs";

export class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];
    this.cartIdCounter = 1;
    this.readCarts();
  }

  createCart() {
    const newCart = {
      id: this.cartIdCounter++,
      products: [],
    };
    this.carts.push(newCart);
    this.saveCarts();
    return newCart;
  }
  
  addCart(cart) {
    const newCart = {
      id: this.cartIdCounter++,
      products: [],
    };
    this.carts.push(newCart);
    this.saveCarts();
    return newCart;
  }

  getCartById(id) {
    const cart = this.carts.find((c) => c.id === id);
    if (!cart) {
      throw new Error("Carrito no encontrado");
    }
    return cart;
  }

  addProductToCart(cartId, productId, quantity) {
    const cart = this.getCartById(cartId);
    const productInCart = cart.products.find((p) => p.productId === productId);

    if (productInCart) {
      productInCart.quantity += quantity;
    } else {
      cart.products.push({
        productId,
        quantity,
      });
    }

    this.saveCarts();
  }

  createCart() {
    const newCart = this.addCart();
    return newCart;
  }

  readCarts() {
    try {
      const data = fs.readFileSync(this.path, "utf-8");
      this.carts = JSON.parse(data);
    } catch (error) {
      this.carts = [];
    }
  }

  saveCarts() {
    fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2), "utf-8");
  }
}
