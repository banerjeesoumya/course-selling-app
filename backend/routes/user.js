const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require ("../config")

router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExists = await User.findOne({
        username: username,
        password: password
    })

    if (userExists) {
        return res.status(403).json({
            msg: "User already exists"
        });
    }

    await User.create({
        username: username,
        password: password
    })
    res.json({
        msg: "User created successfully"
    });
});

router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExists = await User.find({
        username : username,
        password : password
    })

    if(userExists) {
        const token = jwt.sign({
            username : username
        }, JWT_SECRET);
        res.json({
            token
        }).status(200)
    } else {
        res.json({
            msg: "Incorrect Login Details"
        }).status(404)
    }
})

router.get('/courses', async(req, res) => {
    const response = await Course.find({});
    res.json({
        response
    });
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    const courseId = req.params.courseId;
    const username = req.username;

    await User.updateOne({
        username: username
    }, {
        "$push": {
            purchasedCourses: courseId
        }
    });

    res.json({
        msg: "Purchase Complete !!"
    });
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const user = await User.findOne({
        username: req.username
    });

    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    });
    res.json({
        course: courses
    });
});

module.exports = router;