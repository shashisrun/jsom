import JSOM from "../src/index.js";
class Product extends JSOM {
    name;
    description;
    quantity;
    thumnails;
    price;
    salePrice;
    orders;
    carts;
    user;

    constructor() {
        super();
    }
}

export default Product