const express = require("express");
const router = express.Router();
const userModel = require("../models/users");
const mongoose = require("mongoose");

const multer = require("multer");
const blogModel = require("../models/blogModel");

// Configure multer to specify where and how to store uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Define the directory where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    cb(null, `${timestamp}-${file.originalname}`); // Define the filename for the uploaded file
  },
});

const upload = multer({ storage });

// Create a blog
router.post("/create-post", async (req, res) => {
  try {
    const { title, content, image, author } = req.body;
    if (!title || !content || !image) {
      return res.status(400).json({
        success: false,
        message: "Please provide title, content, and image",
      });
    }

    // Create a new blog
    const newBlog = new blogModel({ title, content, image, author });

    // Save the new blog in the database
    await newBlog.save();

    return res.status(200).json({
      success: true,
      message: "Post created successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.error("Error while creating Post:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.get("/all-blogs", async (req, res) => {
  try {
    const blogs = await blogModel.find({});
    if (!blogs) {
      return res.status(200).json({
        success: false,
        message: "No Posts found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Posts retrieved successfully",
      BlogCount: blogs.length,
      blogs: blogs,
    });
  } catch (error) {
    console.error("Error retrieving Posts:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});



// PUT /update-blog/:id route
router.put("/update-blog/:id", async (req, res) => {
  try {
    const blogId = parseInt(req.params.id);
    const { title, content, author } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      blogId,
      { ...req.body },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Post Updated successfully",
      blog: blog,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error while updating Post" });
  }
});
//GET || SIngle Blog Details with blog id
router.get("/get-blog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "blog not found with this is",
      });
    }
    return res.status(200).send({
      success: true,
      message: "fetch single blog",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error while getting single blog",
      error,
    })}
})


// DELETE /delete-blog/:id route
router.delete("/delete-blog/:id", async (req, res) => {
  try {
    const blogId = req.params.id;

    
    // Delete the blog from the database by its _id
    const deletionResult = await blogModel.deleteOne({ _id: blogId });

    if (deletionResult.deletedCount === 1) {
      return res.status(200).json({
        success: true,
        message: "Blog Deleted successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting blog",
    });
  }
});



// GET || user blog with user id
router.get("/user-blog/:userId", async (req, res) => {
  try {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }

    const userBlog = await userModel.findById(req.params.id).populate("blogs");
    if (!userBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found with this ID",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "User blogs",
        userBlog,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in retrieving user blog",
    });
  }
});
module.exports = router;
