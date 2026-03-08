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

export const redeemExp = async (req, res) => {
  try {

    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid redeem amount" });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.exp < amount) {
      return res.status(400).json({ message: "Not enough EXP points" });
    }

    user.exp -= amount;
    await user.save();

    res.json({ exp: user.exp, redeemed: amount });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};