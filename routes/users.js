const express = require('express')
const router = express.Router();
const User = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const JWT_SECRET = "Itaims"

router.post('/', async (req,res)=> {
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    const userData = new User({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
        contact: req.body.contact,
        country: req.body.country
    }) 
    try {
        const newUser =  await userData.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.post("/login", async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ error: "Login with proper credentials!" });
    }
    const passwordCompare = await bcrypt.compare(req.body.password, user.password);
    if (!passwordCompare) {
      return res
        .status(400)
        .json({ error: "Login with proper credentials!" });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ success: "Authenticated!" , token });
  });

module.exports = router