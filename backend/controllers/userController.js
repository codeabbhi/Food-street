const { db } = require("../config/firebase");

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const userDoc = await db.collection("users").doc(userId).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      id: userId,
      ...userDoc.data(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { fullName, phone, address, avatar } = req.body;

    const updateData = {};
    if (fullName) updateData.fullName = fullName;
    if (phone) updateData.phone = phone;
    if (address) updateData.address = address;
    if (avatar) updateData.avatar = avatar;

    updateData.updatedAt = new Date().toISOString();

    await db.collection("users").doc(userId).update(updateData);

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        uid: userId,
        ...updateData,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete user account
exports.deleteUserAccount = async (req, res) => {
  try {
    const userId = req.userId;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password is required to delete account" });
    }

    // Delete user from Firestore
    await db.collection("users").doc(userId).delete();

    // Note: In production, also delete from Firebase Auth
    // This requires additional security considerations

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const usersSnapshot = await db.collection("users").get();
    const users = [];

    usersSnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
