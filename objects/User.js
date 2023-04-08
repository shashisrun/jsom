import JSOM from "../src/index.js";
class User extends JSOM {
    firstName;
    lastName;
    email;
    password;
    constructor() {
        super();
    }

    getFullName() {
        return this.firstName + ' ' + this.lastName;
    }

}

export default User