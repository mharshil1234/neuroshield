import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  questions: {
    q1: {
      type: [String],   // multiple answers
      default: []
    },

    q2: {
      type: [String],
      default: []
    },

    q3: {
      type: [String],
      default: []
    }
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

const User = mongoose.model("User", userSchema);

export default User;