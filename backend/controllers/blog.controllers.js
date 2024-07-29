import BlogModel from "../models/blog.models.js";

export const createBlogController = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    // console.log(req.file.filename);
    if (!title || !description || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const existedBlog = await BlogModel.findOne({ title });

    if (existedBlog) {
      return res
        .status(404)
        .json({ success: false, error: "with this title already blog exist" });
    }

    const newBlog = new BlogModel({
      title,
      description,
      image: req.file.filename,
      user: req.user._id,
    });

    await newBlog.save();
    res
      .status(201)
      .json({ success: true, message: "blog created successfully!" });
  } catch (error) {
    console.log("Error : error while creating blog", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
