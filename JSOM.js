var fs = require('fs');
const constructors = {};

class JSOM {
    id;
    constructor() {
        this.id = 1;
        constructors[this.constructor.name] = this.constructor;
    }
    save() {
        // console.log(this.constructor.name)
        fs.promises.mkdir(`${process.cwd()}/.states/${this.constructor.name}`, { recursive: true }).then(() => {
            fs.writeFile(`${process.cwd()}/.states/${this.constructor.name}/${this.id}.json`, JSON.stringify(this), (data) => {
                // console.log('Wriitten to db');
            });
        })
    }
    static async get(id) {
        try {
            const data = await fs.readFileSync(`${process.cwd()}/.states/${this.name}/${id}.json`, 'utf8');
            return Object.assign(new this, JSON.parse(data));
        } catch (err) {
            console.log(err);
        }
    }

    getReference() {
        return { $refid: this.id, $refto: this.constructor.name }
    }

    getRelation(refrence) {
        return constructors[refrence.$refto].get(refrence.$refid);
    }
}