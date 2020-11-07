const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const User = require("../models/User");

router.get("/", (req, res, next) => {
    res.send(database.users)
})

router.post("/signin", (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body);
    if (email === database.users[0].email && password === database.users[0].password) {
        res.json(database.users[0])
    } else {
        res.status(400).json("error loggin in")
    }
})

router.post(
    "/register",
    async (req, res, next) => {
        console.log("heeey")
        const { name, email, password } = req.body;
        try {
            const emailExist = await User.findOne({ email }, "email")
            if (emailExist) {
                return res.send("Email already exist")
            } else {
                const newUser = await User.create({ name, email, password })
                res.status(200).json(newUser)
                console.log("user Created: ", newUser);
            }
        }
        catch {
            err => {
                next(err)
            }
        }
    })

router.get("/profile/:id", (req, res, next) => {
    const { id } = req.params
    let found = false
    database.users.forEach(user => {
        if (user.id === id) {
            found = true
            return res.json(user)
        }
    })
    if (!found) {
        res.status(400).json("not found")
    }
})

router.put("/image", (req, res, next) => {
    const { id } = req.body
    let found = false
    database.users.forEach(user => {
        if (user.id === id) {
            found = true
            user.entries++
            return res.json(user.entries)
        }
    })
    if (!found) {
        res.status(400).json("not found")
    }
})

module.exports = router