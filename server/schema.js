const mongoose = require('mongoose');
const uuid = require('uuid');
const Schema = mongoose.Schema;
const Model = mongoose.model;

const authSchema = Model(
    "Auth",
    new Schema({
        _id: {
            type: String,
            default: uuid.v4
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        isBoss: {
            type: Boolean,
            default: false
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }),
    "Auth"
);

module.exports = { authSchema }
