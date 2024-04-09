const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    lowercase:true,
    max: 20,
    unique: true,
  },
  profilePicture: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
      default:'https://res.cloudinary.com/dterkhfb3/image/upload/v1712221304/fb_clone_userpost/images_17_vgpanl.jpg'
    },
  },
  coverPicture: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
      default:'https://res.cloudinary.com/dterkhfb3/image/upload/v1712222932/fb_clone_coverPictures/download_2_nyh1eh.jpg'
    },
  },
  refreshtoken: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  followers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref:'User',
    default: [],
  },
  following: {
    type: [mongoose.Schema.Types.ObjectId],
    ref:'User',
    default: [],
  },
  city: {
    type: String,
    default: "mycity",
  },
  phone: {
    type: Number,
    default: 1234,
  },
  Status: {
    type: String,
    default: "Married Or Single",
  },
});

// Create the user model from the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
