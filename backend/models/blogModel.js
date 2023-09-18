const mongoose = require('mongoose');

const { Schema } = mongoose;

const blogSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is Required"]
    },
    content: {
        type: String,
        required: [true, "Content is Required"]
    },
    image: {
        type: String,
        required: [true, "Image is Required"]
    },
    author: {
        type: String,
        required: [true, "Author is Required"]
    },
    date: {
        type: Date,
        default: Date.now,
    }
})


module.exports = mongoose.model("Posts", blogSchema);