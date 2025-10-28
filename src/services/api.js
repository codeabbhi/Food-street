const API_BASE_URL = "http://localhost:5000/api";

// ==================== AUTH APIS ====================

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Registration failed");
    return data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Login failed");
    return data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Logout failed");
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to fetch user");
    return data;
  } catch (error) {
    throw error;
  }
};

// ==================== SHOP APIS ====================

export const getAllShops = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/shops`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to fetch shops");
    return data;
  } catch (error) {
    throw error;
  }
};

export const getShopById = async (shopId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/shops/${shopId}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to fetch shop");
    return data;
  } catch (error) {
    throw error;
  }
};

export const createShop = async (shopData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/shops`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(shopData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to create shop");
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateShop = async (shopId, shopData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/shops/${shopId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(shopData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to update shop");
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteShop = async (shopId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/shops/${shopId}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to delete shop");
    return data;
  } catch (error) {
    throw error;
  }
};

// ==================== ORDER APIS ====================

export const createOrder = async (orderData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to create order");
    return data;
  } catch (error) {
    throw error;
  }
};

export const getUserOrders = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to fetch orders");
    return data;
  } catch (error) {
    throw error;
  }
};

export const getOrderById = async (orderId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to fetch order");
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateOrderStatus = async (orderId, status, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to update order");
    return data;
  } catch (error) {
    throw error;
  }
};

export const cancelOrder = async (orderId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/cancel`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to cancel order");
    return data;
  } catch (error) {
    throw error;
  }
};

// ==================== USER APIS ====================

export const getUserProfile = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to fetch profile");
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (profileData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to update profile");
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteUserAccount = async (password, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/account`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to delete account");
    return data;
  } catch (error) {
    throw error;
  }
};
