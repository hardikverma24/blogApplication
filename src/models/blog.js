const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },

  isPrivate: {
      type: Boolean,
      deafult: false
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
},
{
timestamps: true
})



const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;