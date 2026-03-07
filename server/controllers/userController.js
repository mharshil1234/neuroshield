import User from "../models/User.js";

export const getCurrentUser = async (req, res) => {

  try {

    const user = await User.findById(req.user.id).select("-password");

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }

};

export const updateQuestions = async (req, res) => {
  try {

    const { field, value } = req.body;

    console.log("FIELD:", field);
    console.log("VALUE:", value);
    console.log("USER ID:", req.user.id);

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { [`questions.${field}`]: value } },
      { returnDocument: "after" }
    );

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};