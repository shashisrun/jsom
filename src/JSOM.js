import fs from 'fs'
const constructors = {};

export default class JSOM {
    id;
    constructor() {
        this.id = Date.now() + Math.floor(Math.random() * 100);
    }
    save() {
        const path = `${process.env.JSOMPATH}/${this.constructor.name}`;
        if (fs.existsSync(path)) {
            fs.writeFile(`${path}/${this.id}.json`, JSON.stringify(this), (data) => {
                
            });
        } else {
            fs.promises.mkdir(`${path}`, { recursive: true }).then(() => {
                fs.writeFile(`${path}/${this.id}.json`, JSON.stringify(this), (data) => {
                    
                });
            })
        }
    }
    static async getById(id) {
        try {
            const path = `${process.env.JSOMPATH}/${this.name}/`;
            if (fs.existsSync(path)) {
                const data = await fs.readFileSync(`${path}${id}.json`, 'utf8');
                return Object.assign(new this, JSON.parse(data));
            } else {
                return {}
            }
        } catch (err) {
            console.log(err);
        }
    }

    get() {
        return {...this}
    }

    static async getAll() {
        const results = []
        const path = `${process.env.JSOMPATH}/${this.name}/`;
        if (fs.existsSync(path)) {
            const files = fs.readdirSync(path);
            for (let i = 0; i < files.length; i++) {
                results.push(await this.getById(files[i].split('.')[0]))
            }
        }

        return results
    }

    static define(object) {
        constructors[object.name] = object;
        return constructors[object.name];
    }
    static getObjects() {
        return constructors;
    }

    static destroy(id) {
        return fs.unlinkSync(`${process.env.JSOMPATH}/${this.name}/${id}.json`);
    }

    getReference() {
        return { $refid: this.id, $refto: this.constructor.name }
    }

    async getRelation(refrence) {
        return await constructors[refrence.$refto].getById(refrence.$refid);
    }
}