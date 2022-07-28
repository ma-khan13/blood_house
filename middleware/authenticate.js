const jwt = require('jsonwebtoken');
const User = require('../schemas/User');

async function authenticate(req, res, next) {

    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({message:"Unauthorized"});
        }
        token = token.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        let user = await User.findOne({_id: decoded._id});
        if (!user) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = decoded;
        next()
    } catch (e) {
        return res.status(400).json({ message: "Invalid token" });
    }
}

module.exports = authenticate;