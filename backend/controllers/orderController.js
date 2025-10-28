const { db } = require("../config/firebase");

// Create order
exports.createOrder = async (req, res) => {
  try {
    const { shopId, items, totalPrice, deliveryAddress } = req.body;
    const userId = req.userId;

    // Validate input
    if (!shopId || !items || !totalPrice) {
      return res.status(400).json({ error: "Shop ID, items, and total price are required" });
    }

    const orderRef = await db.collection("orders").add({
      userId,
      shopId,
      items,
      totalPrice,
      deliveryAddress: deliveryAddress || "",
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    res.status(201).json({
      orderId: orderRef.id,
      message: "Order created successfully",
      order: {
        id: orderRef.id,
        userId,
        shopId,
        items,
        totalPrice,
        status: "pending",
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get user orders
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const ordersSnapshot = await db
      .collection("orders")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();

    const orders = [];
    ordersSnapshot.forEach((doc) => {
      orders.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const orderDoc = await db.collection("orders").doc(orderId).get();

    if (!orderDoc.exists) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Check if user owns this order
    const orderData = orderDoc.data();
    if (orderData.userId !== req.userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    res.status(200).json({
      id: orderDoc.id,
      ...orderData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ["pending", "confirmed", "preparing", "ready", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    await db.collection("orders").doc(orderId).update({
      status,
      updatedAt: new Date().toISOString(),
    });

    res.status(200).json({ message: "Order status updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Cancel order
exports.cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.userId;

    const orderDoc = await db.collection("orders").doc(orderId).get();

    if (!orderDoc.exists) {
      return res.status(404).json({ error: "Order not found" });
    }

    const orderData = orderDoc.data();

    // Check if user owns this order
    if (orderData.userId !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Can only cancel pending or confirmed orders
    if (!["pending", "confirmed"].includes(orderData.status)) {
      return res.status(400).json({ error: "Cannot cancel this order" });
    }

    await db.collection("orders").doc(orderId).update({
      status: "cancelled",
      updatedAt: new Date().toISOString(),
    });

    res.status(200).json({ message: "Order cancelled successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
