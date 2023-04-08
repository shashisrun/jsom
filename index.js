import crudController from './controllers/crudController.js';
import express from 'express';
import objects from './objects/index.js';
import JSOM from './src/index.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();
for (let i = 0; i < objects.length; i++) {
    JSOM.define(objects[i])
}

const app = express();
app.use(bodyParser.json());
app.use('/:object/:method/:id?/*', crudController);
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});