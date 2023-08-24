import express from "express";
const router = express.Router();
import { v2 as cloudinary } from "cloudinary";
import Blog from "../models/blogModel.js";
import Authotorization from "./../middleware/auth.js";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRETE,
});

// post new blog
router.post("/", Authotorization, (req, res) => {
  const file = req.files.photo;
  cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    console.log(result);
    const blog = new Blog({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      author: req.body.author,
      photo: result.url,
    });
    blog
      .save()
      .then((result) => {
       return res.status(200).json({ result: result });
      })
      .catch((err) => {
       return res.status(500).json({
          error: err,
        });
      });
  });
});

// get all blogs
router.get("/", (req, res) => {
  Blog.find()
    .then((result) => {
     return res.status(200).json({ blog: result });
    })
    .catch((err) => {
     return res.status(500).json({
        error: err,
      });
    });
});

// get blog by category
router.get("/category/:category", async(req, res) => {
   await Blog.find({ category: req.params.category })
   .then((result) => {
   return res.status(200).json({
      blog:result
    })
   })
   .catch(err => {
  return  res.status(400).json({
      err:err
    })
   })
})

// get blog by author
router.get("/author/:author", async(req, res) => {
   await Blog.find({ author: req.params.author })
   .then((result) => {
   return res.status(200).json({
      blog:result
    })
   })
   .catch(err => {
   return res.status(400).json({
      err:err
    })
   })
})


// get single blog by id
router.get("/:id", (req, res) => {
  Blog.findById(req.params.id)
    .then((result) => {
     return res.status(200).json({
        blog: result,
      });
    })
    .catch((err) => {
     return res.status(500).json({
        error: err,
      });
    });
});

// delete perticular post by id
router.delete("/:id", Authotorization, (req, res) => {
  const imageUrl = req.query.imageUrl;
  const urlArray = imageUrl.split("/");
  const image = urlArray[urlArray.length - 1];
  const imageName = image.split(".")[0];

  Blog.findByIdAndRemove(req.query.id)
    .then((result) => {
      cloudinary.uploader.destroy(imageName, (err, result) => {
        console.log(result);
      });
     return res.status(200).json({
        result: result,
      });
    })
    .catch((err) => {
     return res.status(500).json({
        error: err,
      });
    });
});

// update post
router.put("/:id", Authotorization, (req, res) => {
  const file = req.files.photo;
  cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    Blog.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          category: req.body.category,
          author: req.body.author,
          photo: result.url,
        },
      }
    )
      .then((result) => {
     return res.status(200).json({
          result: result,
        });
      })
      .catch((err) => {
       return res.status(500).json({
          error: err,
        });
      });
  });
});

export default router;
