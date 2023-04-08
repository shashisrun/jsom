import fs from 'fs'
const constructors = {};

export default class JSOM {
    id;
    constructor() {
        this.id = Date.now() + Math.floor(Math.random() * 100);
    }
    save() {
        // console.log(this.constructor.name)
        fs.promises.mkdir(`${process.env.JSOMPATH}/${this.constructor.name}`, { recursive: true }).then(() => {
            fs.writeFile(`${process.env.JSOMPATH}/${this.constructor.name}/${this.id}.json`, JSON.stringify(this), (data) => {
                
            });
        })
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

    static readFiles(dirname, onFileContent, onError) {
        fs.readdir(dirname, function (err, filenames) {
            if (err) {
                onError(err);
                return;
            }
            filenames.forEach(function (filename) {
                fs.readFile(dirname + filename, 'utf-8', function (err, content) {
                    if (err) {
                        onError(err);
                        return;
                    }
                    onFileContent(filename, content);
                });
            });
        });
    }

    static define(object) {
        constructors[object.name] = object;
        return constructors[object.name];
    }
    static getObjects(object) {
        return constructors;
    }

    getReference() {
        return { $refid: this.id, $refto: this.constructor.name }
    }

    getRelation(refrence) {
        return constructors[refrence.$refto].get(refrence.$refid);
    }
}