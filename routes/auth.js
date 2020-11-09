const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const User = require("../models/User");
const mongoose = require("mongoose");
const image = require("../clarifaicontroler/controler")

router.post("/signin",
    async (req, res, next) => {
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email: email });
            if (!user) {
                res.status(404).json("user not found")
                return
            }
            else if (user) {
                bcrypt.compareSync(password, user.password)
                    ? res.status(200).json(user)
                    : res.status(404).json("wrong password")
            }
        }
        catch (error) {
            next(error);
        }
    })

router.post(
    "/register",
    async (req, res, next) => {
        const { name, email, password } = req.body;
        const salt = bcrypt.genSaltSync(saltRounds)
        const hashPassword = bcrypt.hashSync(password, salt)
        try {
            console.log(name, email, password);
            if (name === "" || email === "" || password === "") {
                res.status(400).json("fill the inputs")
                return
            }
            const emailExist = await User.findOne({ email }, "email")
            if (emailExist) {
                res.status(400).json("email already exist")
            } else {
                const newUser = await User.create({ name, email, password: hashPassword })
                res.status(200).json(newUser)
                console.log("user Created: ", newUser);
            }
        }
        catch {
            err => {
                res.status(400).json(err)
            }
        }
    })

router.get("/profile/:id",
    async (req, res, next) => {
        const { id } = req.params
        if (mongoose.Types.ObjectId.isValid(id)) {
            try {
                const user = await User.findById(id);
                if (user) {
                    res.status(200).send(user)
                } else {
                    res.status(400).json("no user found")
                }
            }
            catch (err) {
                res.send(err)
            }
        } else {
            res.status(500).json("id is not valid")
        }
    })

router.put("/image",
    async (req, res, next) => {
        const { id } = req.body

        if (mongoose.Types.ObjectId.isValid(id)) {
            try {
                const userToEdit = await User.findByIdAndUpdate(id, { $inc: { entries: 1 } }, { new: true })
                if (userToEdit) {

                    res.status(200).json(userToEdit)
                } else {
                    res.status(400).json("no user found")
                }
            }
            catch (err) {
                res.send(err)
            }
        } else {
            res.status(500).json("id is not valid")
        }
    })

router.post("/imageurl", (req, res) => { image.handleApiCall(req, res) })

module.exports = router