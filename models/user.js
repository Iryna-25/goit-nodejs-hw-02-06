const { Schema, model } = require("mongoose");

const Joi = require("joi");

const emailRegexp = /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

const userShema = Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: emailRegexp,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },
    avatarURL: {
        type: String,
        required: true,
    },
}, { versionKey: false, timestamps: true });

const registerJoiShema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
    register: registerJoiShema,
    login: registerJoiShema,
};

const User = model("user", userShema);

module.exports = {
    User,
    schemas
}