const { Admin } = require("../db");

async function adminMiddleware (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    const existsUser = await Admin.findOne({
        username : username,
        password : password
    });

    if (existsUser) {
        next();
    } else {
        res.status(403).json({
            msg : "Wrong credentials. Admin doesn't exist"
        });
    }
}

module.exports = adminMiddleware;