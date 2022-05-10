const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { createError } = require("../../helpers");

const { User, schemas } = require("../../models/user");

const router = express.Router();

const { SECRET_KEY } = process.env;

router.post("/register", async (req, res, next) => {
    try {
        const { error } = schemas.register.validate(req.body);
        if (error) {
            throw createError(400, "Email or password invalid")
        }
        const { email, password } = req.body;
        const result = await User.findOne({ email });
        if (result) {
            throw createError(409, "Email in use");
        }
        const hashPassword = await bcrypt.hash(password, 10);
        await User.create({ email, password: hashPassword });
        res.status(201).json({
            user: {
                email
            }
        })

    } catch (error) {
        next(error);
    }
});

router.post("/login", async (req, res, next) => {
    try {
        const { error } = schemas.login.validate(req.body);
        if (error) {
            throw createError(400, "Email or password is wrong")
        }
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw createError(401, "Email is wrong")
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            throw createError(401, "Password is wrong")
        }

        const payload = {
            id: user._id
        }

        const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"});
        res.json({
            token,
            user: {
                email
            }
        })
    } catch (error) {
        next(error);        
    }
})

module.exports = router;