const { db } = require("../config/firebase");

// Get all shops
exports.getAllShops = async (req, res) => {
  try {
    const shopsSnapshot = await db.collection("shops").get();
    const shops = [];

    shopsSnapshot.forEach((doc) => {
      shops.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get shop by ID
exports.getShopById = async (req, res) => {
  try {
    const { shopId } = req.params;

    const shopDoc = await db.collection("shops").doc(shopId).get();

    if (!shopDoc.exists) {
      return res.status(404).json({ error: "Shop not found" });
    }

    res.status(200).json({
      id: shopDoc.id,
      ...shopDoc.data(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create shop (admin only)
exports.createShop = async (req, res) => {
  try {
    const { name, tagline, image, menu } = req.body;

    // Validate input
    if (!name || !tagline || !image) {
      return res.status(400).json({ error: "Name, tagline, and image are required" });
    }

    const shopRef = await db.collection("shops").add({
      name,
      tagline,
      image,
      menu: menu || [],
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({
      id: shopRef.id,
      message: "Shop created successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update shop
exports.updateShop = async (req, res) => {
  try {
    const { shopId } = req.params;
    const updateData = req.body;

    await db.collection("shops").doc(shopId).update(updateData);

    res.status(200).json({ message: "Shop updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete shop
exports.deleteShop = async (req, res) => {
  try {
    const { shopId } = req.params;

    await db.collection("shops").doc(shopId).delete();

    res.status(200).json({ message: "Shop deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
