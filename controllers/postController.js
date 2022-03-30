const router = require("express").Router();
const db = require("../models/index");
const multer = require("multer");
const Admin = db.admins;
const Post = db.posts;
const path = require("path"); 
const fs = require("fs");
const jwt_decode = require("jwt-decode");

const getAllPosts = async (req, res, next) => {
  // var token = req.headers.authorization.split(" ")[1];

  // var decode = jwt_decode(token);
  try {
    const post = await Post.findAll({
      include: [
        {
          model: Admin,
          attributes: ["username"],
        },
      ],
    });

    res.send({
      status: "success",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "5242880" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpg|png|JPG|PNG|JPEG|jpeg/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
});
const createNewPost = async (req, res) => {
  // console.log(req)
  var token = req.headers.authorization.split(" ")[1];

  var decode = jwt_decode(token);
  console.log(decode.userid);
  try {
    const { title, desc, Author } = req.body;
    const user_id = decode.userid;
    // const image = req.file.path;
    const image = req.file.path;
    const blog = { title, desc, user_id, Author, image };
    const post = await Post.create(blog);
    res.status(201).json({ status: "created", post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findPostById = await Post.findByPk(id);
    if (!findPostById) {
      res.status(404).json("Form not found!");
    }
    const deletePost = findPostById.destroy();
    if (!deletePost) {
      res.status(503).send({
        status: "error",
        message: `Post with id ${id} failed to delete`,
      });
    }
    res.status(200).send({
      status: "success",
      message: `Post with id ${id} deleted`,
    });
  } catch (error) {
    next(error);
  }
};
const getPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findPostById = await Post.findByPk(id);
    if (!findPostById) {
      res.status(404).json("Form not found!");
    }

    res.status(201).json({ status: "found", Post: findPostById });
  } catch (error) {
    next(error);
  }
};
const updatePost = async (req, res, next) => {
    console.log(req.body)
  try {
    const { id } = req.params;
    const updatePostById = await Post.findByPk(id);
    if (!updatePostById) {
      res.status(404).json("Post not found!");
    }

    if (req.file) {
      var data = {
        "title": req.body.title,
        "desc": req.body.desc,
        "image": req.file.path,
      }
    
    }else{
        var data = {
            "title": req.body.title,
            "desc": req.body.desc,
            "image": updatePostById.image,
          }
    }

    const updatePost = await updatePostById.update(data);
    res.status(201).json({ status: "updated", Post: updatePost });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllPosts,
  upload,
  createNewPost,
  updatePost,
  deletePost,
  getPost,
};
