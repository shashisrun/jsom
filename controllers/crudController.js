import JSOM from "../src/index.js";

const methods = {}
methods.browse = async (req, res, object) => {
    if (object.browse) {
        object.browse(req, res)
    } else {
        const results = await object.getAll();
        res.send([...results]);
    }
}

methods.read = (req, res, object) => {
    if (object.browse) {
        object.browse(req, res)
    } else {
        res.send({});
    }
}

methods.add = (req, res, object) => {
    const instance = new object();
    if (instance.add) {
        instance.add(req, res)
    } else {
        Object.assign(instance, req.body);
        instance.save();
        res.send({ ...instance });
    }
}

methods.edit = (req, res, object) => {
    
}

methods.destroy = (req, res, object) => {
    
}
export default function crudController(req, res) {
    const objects = JSOM.getObjects();
    if (!objects[req.params.object] || !methods[req.params.method]) {
        res.send('Url Not Found')
        return;
    } else {
        methods[req.params.method](req, res, objects[req.params.object])
    }
}
