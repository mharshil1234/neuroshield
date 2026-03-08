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
    distractions: {
      type: [String],
      default: []
    },

    productivity: {
      type: [String],
      default: []
    },

    struggles: {
      type: [String],
      default: []
    },
  },

  exp: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  focusSessionLength: {
    type: Number,
    default: 25
  },

  breakLength: {
    type: Number,
    default: 5
  }

});

const User = mongoose.model("User", userSchema);

export default User;