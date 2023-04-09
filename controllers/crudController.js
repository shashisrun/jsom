import JSOM from "../src/index.js";

const methods = {}

methods.read = async (req, res, object) => {
    let pointer;
    if (object.read) {
        pointer = await object.read(req, res)
    } else {
        if (req.params.id) {
            pointer = await object.getById(req.params.id)
        } else {
            object.getAll().then((results) => {
                res.send([...results]);
            })
        }
    }
    if (req.params.id && pointer) {
        const fns = req.params[0].split('/');
        for (let i = 0; i < fns.length; i++) {
            if (pointer[fns[i]] || pointer[parseInt(fns[i])]) {
                const key = pointer[fns[i]] ? fns[i] : parseInt(fns[i]);
                if (pointer[key] instanceof Function){
                    pointer = await pointer[key](req, res)
                } else {
                    pointer = pointer[key]
                }
            } else {
                break;
            }
        }
        if (!res.headersSent) {
            res.send(pointer);
        }
    }
}

methods.create = async (req, res, object) => {
    const instance = new object();
    if (instance.add) {
        instance.add(req, res)
    } else {
        Object.assign(instance, req.body);
        instance.save();
        res.send({ ...instance });
    }
}

methods.update = async (req, res, object) => {
    const instance = await object.getById(req.params.id)
    let pointer;
    if (instance.edit) {
        pointer = await instance.edit(req, res)
    } else {
        Object.assign(instance, req.body);
        instance.save();
        pointer = instance
    }
    if (pointer) {
        const fns = req.params[0].split('/');
        for (let i = 0; i < fns.length; i++) {
            if (pointer[fns[i]] || pointer[parseInt(fns[i])]) {
                const key = pointer[fns[i]] ? fns[i] : parseInt(fns[i]);
                if (pointer[key] instanceof Function) {
                    pointer = await pointer[key](req, res)
                } else {
                    pointer = pointer[key]
                }
            } else {
                break;
            }
        }
        if (!res.headersSent) {
            res.send(pointer);
        }
    }
}

methods.delete = async (req, res, object) => {
    if (object.destroy) {
        object.destroy(req, res)
    } else {
        object.destroy(req.params.id)
        res.send('Deleted');
    }
}
export default function crudController(req, res) {
    const objects = JSOM.getObjects();
    if (!objects[req.params.object] || (!methods[req.params.method] && !objects[req.params.object][req.params.method])) {
        res.send('Url Not Found')
        return;
    } else {
        methods[req.params.method](req, res, objects[req.params.object])
    }
}
