import fs from "fs";

  export class CartManager {
  constructor() {
    this.path = "carritos.json";
    this.carts = [];
    this.createFile();
  }

  createFile() {
    if (!fs.existsSync(this.path)) {
      this.saveCartsInJSON();
    }
  }

  newCart() {
    this.carts = this.getCarts();
    const id = this.carts.length + 1;
    this.carts.push({ id, products: [] });
    this.saveCartsInJSON();
    return true;
  }

  getCarts() {
    this.carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    return this.carts;
  }

  getCartById(id) {
    const carts = this.getCarts();
    return carts.find((cart) => cart.id === id) || console.error("Not found");
  }

  addProductToCart(cid, pid) {
    this.carts = this.getCarts();
    const cart = this.carts.find((cart) => cart.id === cid);
    if (!cart) {
      return false;
    }

    let product = cart.products.find((prod) => prod.product === pid);

    if (product) {
      product.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    this.saveCartsInJSON();
    console.log("Cart updated!");
    return true;
  }

  saveCartsInJSON() {
    fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2));
  }
}

