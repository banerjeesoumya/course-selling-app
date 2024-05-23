const { Router } = require("express");
const router = Router();
const { User, Course } = require("../db");
const userMiddleware = require("../middleware/user");
const { route, use } = require("./admin");

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

router.get('/courses', async(req, res) => {
    const response = await Course.find({});
    res.json({
        response
    });
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    const courseId = req.params.courseId;
    const username = req.headers.username;

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
        username: req.headers.username
    });

    console.log(user.purchasedCourses);
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