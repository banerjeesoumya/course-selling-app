const { User } = require("../db");
async function userMiddleware (req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;

    const userExists = await User.findOne({
        username : username,
        password : password
    });
    
    if (userExists) {
        next();
    } else {
        res.status(403).json({
            msg : "User doesn't exists"
        });
    }
}

module.exports = userMiddleware;