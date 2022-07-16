const router = require("express").Router();
const mongoose = require("mongoose");
const Post = require("../models/Post.model");
const fileUploader = require('../config/cloudinary.config');

router.get("/post-form", (req, res, next) => {
    res.render("posts/post-form")
})

router.post("/create-post", fileUploader.single("image"), (req, res, next) => {
    Post.create({
        content:    req.body.desc,
        creatorId:  req.session.user._id,
        picPath :   req.file.path,
        picName :   req.body.title
    })
    .then(()=> {
        res.redirect("/posts")
    })
    .catch(err => next(err))
})

router.get("/posts", (req, res, next) => {
    Post.find()
    .then(postsFromDB => {
        console.log(postsFromDB)
        res.render("posts/posts", {
            posts : postsFromDB
        })
    })
    .catch(err => next(err))
})

router.get("/posts/:id", (req, res, next) => {
    Post.findById(req.params.id)
    .then(postFromDB => {
        res.render("posts/postsDetails", {
            post : postFromDB
        })
    })
    .catch(err => next(err))
})

module.exports = router;
