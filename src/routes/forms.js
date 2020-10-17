const express = require('express');
const mongoose = require('mongoose');
const { checkValueIfEmpty } = require('../libs/validator');
const Form = mongoose.model('Form');
const router = express.Router();

router.get('/forms/:id', async (req, res) => {
    console.log(req.params.id);
    try {
        const forms = await Form.findById(req.params.id);
        if (!forms) {
            return res
                .status(404)
                .send({ error: 'Provided form with the _id not found' });
        }
        res.send(forms);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/forms', async (req, res) => {
    console.log(req.params.id);
    try {
        const forms = await Form.find();
        res.send(forms);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/forms', async (req, res) => {
    try {
        const { name, email, country, state, city, addressLine1, addressLine2, gender, maritalStatus, favFood, favColor } = { ...req.body };


        if (!checkValueIfEmpty([name, email, country, state, city, addressLine1, addressLine2, gender, maritalStatus, favFood, favColor])) {
            return res
                .status(422)
                .send({ error: 'You must provide all parameters in body' });
        }

        const form = new Form({ name, email, country, state, city, addressLine1, addressLine2, gender, maritalStatus, favFood, favColor });
        await form.save();
        res.send(form);
    } catch (err) {
        res.status(422).send({ error: err.message });
    }
});

router.put('/forms', async (req, res) => {

    try {
        const { _id, name, email, country, state, city, addressLine1, addressLine2, gender, maritalStatus, favFood, favColor } = { ...req.body };


        if (!checkValueIfEmpty([_id, name, email, country, state, city, addressLine1, addressLine2, gender, maritalStatus, favFood, favColor])) {
            return res
                .status(422)
                .send({ error: 'You must provide all parameters in body' });
        }

        const form = await Form.findByIdAndUpdate({ _id }, { name, email, country, state, city, addressLine1, addressLine2, gender, maritalStatus, favFood, favColor });
        if (form) {
            res.send(form);
        } else {
            throw new Error(form);
        }

    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

router.delete('/forms/:id', async (req, res) => {
    console.log(req.params.id);
    const _id = req.params.id;

    if (!_id) {
        return res
            .status(422)
            .send({ error: 'You must provide a _id params in body' });
    }

    try {
        const mess = await Form.findByIdAndDelete(_id);
        if (!mess) {
            return res
                .status(404)
                .send({ error: 'Provided form with the _id not found' });
        }
        res.send({ message: 'Deleted the form Successfully', serverMessage: mess });

    } catch (err) {
        res.status(500).send(err);
    }
});


module.exports = router;
