import JSOM from "../src/index.js";
import Cart from "./Cart.js";
class User extends JSOM {
    firstName;
    lastName;
    email;
    password;
    cart;
    constructor() {
        super();
    }

    getFullName() {
        return this.firstName + ' ' + this.lastName;
    }

    async addToCart(req, res) {
        if (!this.cart) {
            const cart = new Cart();
            cart.user = this.getReference();
            this.cart = cart.getReference();
            cart.save();
            this.save();
        }
        const cart = await this.getRelation(this.cart);
        await cart.addProduct(req.body.product);
        return cart;
    }

}

export default User