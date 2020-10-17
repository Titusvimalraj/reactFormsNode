const mongoose = require('mongoose');

const genderSchema = new mongoose.Schema({
    male: {
        type: Boolean,
        required: true
    },
    female: {
        type: Boolean,
        required: true
    },
    other: {
        type: Boolean,
        required: true
    }
});

const maritalStatusSchema = new mongoose.Schema({
    single: {
        type: Boolean,
        required: true
    },
    married: {
        type: Boolean,
        required: true
    },
    divorced: {
        type: Boolean,
        required: true
    },
    widowed: {
        type: Boolean,
        required: true
    }
});


const formSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    addressLine1: {
        type: String,
        required: true
    },
    addressLine2: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    maritalStatus: {
        type: String,
        required: true
    },
    favFood: {
        type: String,
        required: true
    },
    favColor: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model('Form', formSchema);
