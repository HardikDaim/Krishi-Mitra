const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    posts : [{
        type:mongoose.Types.ObjectId,
        ref : 'Posts'
    }],
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model("Users", userSchema);