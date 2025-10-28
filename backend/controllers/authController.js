const { auth, db } = require("../config/firebase");

// Register user
exports.register = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    // Validate input
    if (!email || !password || !fullName) {
      return res.status(400).json({ error: "Email, password, and full name are required" });
    }

    // Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
    });

    // Store user data in Firestore
    await db.collection("users").doc(userRecord.uid).set({
      uid: userRecord.uid,
      fullName,
      email,
      createdAt: new Date().toISOString(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      address: "",
      phone: "",
    });

    res.status(201).json({
      message: "User registered successfully",
      uid: userRecord.uid,
      email: userRecord.email,
    });
  } catch (error) {
    if (error.code === "auth/email-already-exists") {
      return res.status(400).json({ error: "Email already registered" });
    }
    res.status(400).json({ error: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Get user by email
    const userRecord = await auth.getUserByEmail(email);

    // Get user data from Firestore
    const userDoc = await db.collection("users").doc(userRecord.uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User data not found" });
    }

    const userData = userDoc.data();

    res.status(200).json({
      message: "Login successful",
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        fullName: userData.fullName,
        avatar: userData.avatar,
      },
    });
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      return res.status(404).json({ error: "User not found. Please sign up first" });
    }
    res.status(400).json({ error: error.message });
  }
};

// Logout user
exports.logout = async (req, res) => {
  try {
    // Token validation happens in middleware
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;

    const userDoc = await db.collection("users").doc(userId).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      user: {
        uid: userId,
        ...userDoc.data(),
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
