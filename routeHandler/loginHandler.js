const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../schemas/User");
router.post("/", async (req, res) => {
  
    const { email, password } = req.body;
    const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Your email not exist",
    });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
        return res.status(400).json({
        message: "Your password not match",
    });
    }
    const palosd = {
        _id: user._id,
        name: user.name,
        email: user.email,
        city: user.city,
        age: user.age,
        phone:user.phone
    }
    const token = jwt.sign(palosd, process.env.JWT_SECRET, { expiresIn: "1d" });
    return res.status(200).json({
        message: "User login successfully",
        token: token,
    });
});

module.exports = router;
