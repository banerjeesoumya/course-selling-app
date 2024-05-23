const { Router } = require("express");
const adminMiddleware = require("../middleware/admin")
const { Admin, Course } = require("../db")
const router = Router()

router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const adminExists = await Admin.findOne({
        username: username,
        password: password
    });
    
    if (adminExists) {
        return res.status(403).json({
            msg: "Admin already exists"
        })
    }
     
    await Admin.create({
        username: username,
        password: password
    })

    res.json({
        msg: "Admin created succesfully"
    })
});

router.post('/courses', adminMiddleware, async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    const newCourse = await Course.create({
        title: title,
        description: description,
        imageLink: imageLink,
        price: price
    });
    res.json({
        msg: 'Course created succesfully', courseId: newCourse._id 
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    const response = await Course.find({});
    res.json({
        course : response
    });
});

module.exports = router;