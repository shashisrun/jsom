import JSOM from "../src/index.js";
import Product from "./Product.js";
class Cart extends JSOM {
    user;
    products;
    constructor() {
        super();
    }
    async addProduct(id) {
        if (!this.products) {
            this.products = [];
        }
        const product = await Product.getById(id);
        this.products.push(product.getReference())
        this.save();
        return {...this}
    }

    async getProducts() {
        const results = [];
        if (!this.products) {
            this.products = [];
        }
        for (let i = 0; i < this.products.length; i++) {
            results.push(await this.getRelation(this.products[i]))
        }
        return results;
    }
}

export default Cart