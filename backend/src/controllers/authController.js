const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/model.js").User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { body, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
    let list = await User.find({});
    return res.status(500).json({ data: list });
});

router.post(
    "/login",
    //middlerware check input
    [
        body("email")
            .notEmpty()
            .withMessage("Please provide email.")
        ,body("password")
            .notEmpty()
            .withMessage("Please provide password.")
    ],
    async (req, res) => {
        try {
            //if exists error from middlerware before, return error
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            //check exists user email
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res
                    .status(401)
                    .json({ errors: [{msg: "Email or password is incorrect."}] });
            }
            
            //check isvalid user password
            const match = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!match) {
                return res
                    .status(401)
                    .json({ errors: [{msg: "Email or password is incorrect."}] });
            }

            //create token
            const token = createToken(user);

            //save to cookie
            res.cookie("graceful_token", token, {
                maxAge: 3600000,
                httpOnly: false,
            });

            res.status(200).json({ message: "Login successfully!" });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error." });
        }
    }
);
router.post(
    "/signup",
    //middlerware check input
    [
        body("name")
            .notEmpty()
            .withMessage("Name cannot be left blank")
            .matches(/^[A-Za-z\s]+$/)
            .withMessage("Name can only contain letters and spaces"),
        body("email")
            .notEmpty()
            .withMessage("Please provide email.")
            .isEmail()
            .withMessage("Email invalid."),
        body("password")
            .notEmpty()
            .withMessage("Please provide password.")
            .isLength({ min: 6 })
            .withMessage("Password must contain at least 6 characters.")
            .matches(/\d/)
            .withMessage("Password must contain at least one digit.")
            .matches(/[a-zA-Z]/)
            .withMessage("The password must contain at least one charracter."),
    ],
    async (req, res) => {
        try {
            
            //if exists error from middlerware before, return error
            let errors = validationResult(req);
            if(req.body.password !== req.body.repassword){
                if (!errors.isEmpty()){
                    temp = {msg: "Password and repeat password do not match."}
                    let array = errors.array()
                    array.push(temp)
                    return res.status(400).json({ errors: array });
                }else{
                    return res.status(400).json({ errors: [{msg: "Password and repeat password do not match."}] });
                }
            }
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            //if user exists -> error
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                return res
                    .status(401)
                    .json({ message: "User already exists!" });
            }

            //create user and return
            const userNew = await new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: "user",
            });
            await userNew.save();
            return res
                .status(200)
                .json({ message: "Sign up successfully!", data: userNew });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error." });
        }
    }
);

const createToken = (user) => {
    return jwt.sign({ _id: user._id }, process.env.SECRET_Key);
};
router.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        res.status(200).json({ user: {
            name: req.user.name,
            email: req.user.email,
            role: req.user.role
        } });
    }
);
module.exports = router;
