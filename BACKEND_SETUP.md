# 🎯 Complete Backend & Frontend Integration Guide

## **✅ What's Been Created**

### **Backend Structure**
```
backend/
├── config/firebase.js              ✅ Firebase Admin SDK
├── controllers/
│   ├── authController.js           ✅ User authentication
│   ├── shopController.js           ✅ Shop management
│   ├── orderController.js          ✅ Order processing
│   └── userController.js           ✅ User profiles
├── routes/
│   ├── auth.js                     ✅ Auth endpoints
│   ├── shops.js                    ✅ Shop endpoints
│   ├── orders.js                   ✅ Order endpoints
│   └── users.js                    ✅ User endpoints
├── middleware/
│   ├── authMiddleware.js           ✅ Token verification
│   └── errorHandler.js             ✅ Error handling
├── server.js                        ✅ Express server
├── package.json                     ✅ Dependencies
└── .env.example                     ✅ Environment template
```

### **Frontend Service**
```
src/services/api.js                 ✅ API communication layer
```

---

## **🚀 Step 1: Start Backend Server**

```bash
cd backend
npm run dev
```

✅ Server running on `http://localhost:5000`
✅ Health check: `http://localhost:5000/api/health`

---

## **🚀 Step 2: Start Frontend Server**

In another terminal:
```bash
cd foodstreet
npm start
```

✅ Frontend running on `http://localhost:3000`

---

## **📝 Step 3: Test the Full Flow**

### **1. Sign Up**
1. Go to `http://localhost:3000/signup`
2. Fill in: Full Name, Email, Password
3. Click "Sign Up"
4. ✅ Check backend console for logs
5. ✅ Data saved in Firebase Firestore

### **2. Log In**
1. Go to `http://localhost:3000/login`
2. Enter registered email and password
3. Click "Login"
4. ✅ Token stored locally
5. ✅ Navbar shows "My Account" button

### **3. View Shops**
1. Click "Shop" in navbar or "Explore Shops"
2. ✅ Fetches from backend API
3. ✅ Click shop card to view details

---

## **🔧 Environment Variables**

Create `.env` file in backend folder:

```
PORT=5000
NODE_ENV=development
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
CORS_ORIGIN=http://localhost:3000
```

---

## **📊 API Response Examples**

### **Register Response**
```json
{
  "message": "User registered successfully",
  "uid": "user123",
  "email": "user@example.com"
}
```

### **Login Response**
```json
{
  "message": "Login successful",
  "user": {
    "uid": "user123",
    "email": "user@example.com",
    "fullName": "John Doe",
    "avatar": "https://api.dicebear.com/..."
  }
}
```

### **Get Shops Response**
```json
[
  {
    "id": "pizza-hub",
    "name": "Pizza Hub",
    "tagline": "Cheesy delight in every bite!",
    "image": "https://...",
    "menu": [
      { "name": "Margherita", "price": 180 },
      { "name": "Farmhouse", "price": 250 }
    ]
  }
]
```

### **Create Order Response**
```json
{
  "orderId": "order123",
  "message": "Order created successfully",
  "order": {
    "id": "order123",
    "userId": "user123",
    "shopId": "pizza-hub",
    "items": [...],
    "totalPrice": 500,
    "status": "pending"
  }
}
```

---

## **🔐 How Authentication Works**

1. **User Signs Up**
   - Frontend sends email + password to `/api/auth/register`
   - Backend creates user in Firebase Auth
   - Backend stores user profile in Firestore
   - User redirected to login

2. **User Logs In**
   - Frontend sends email to `/api/auth/login`
   - Backend verifies user exists
   - Backend returns user data (no password sent!)
   - Frontend stores user data in localStorage

3. **Making Protected Requests**
   - Frontend gets Firebase token from `auth.getIdToken()`
   - Sends token in `Authorization: Bearer <token>` header
   - Backend verifies token using `auth.verifyIdToken()`
   - If valid, request proceeds; if invalid, returns 401

---

## **🐛 Testing Endpoints with Postman**

### **1. Register**
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123",
  "fullName": "Test User"
}
```

### **2. Get All Shops**
```
GET http://localhost:5000/api/shops
```

### **3. Create Order (with token)**
```
POST http://localhost:5000/api/orders
Content-Type: application/json
Authorization: Bearer <your_firebase_token>

{
  "shopId": "pizza-hub",
  "items": [
    { "name": "Margherita", "price": 180, "quantity": 2 }
  ],
  "totalPrice": 360,
  "deliveryAddress": "123 Main St"
}
```

---

## **📱 Frontend Integration Examples**

### **Using API in Signup Component**
```javascript
import { registerUser } from "../services/api";

const handleSignup = async (e) => {
  e.preventDefault();
  try {
    const response = await registerUser({
      email: formData.email,
      password: formData.password,
      fullName: formData.fullName,
    });
    // Success - redirect to login
  } catch (error) {
    setError(error.message);
  }
};
```

### **Using API in Home Component**
```javascript
import { getAllShops } from "../services/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const data = await getAllShops();
        setShops(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchShops();
  }, []);

  return <div>{/* Display shops */}</div>;
}
```

### **Using API with Authentication**
```javascript
import { createOrder } from "../services/api";

const handleOrderSubmit = async (orderData) => {
  try {
    const token = localStorage.getItem("firebaseToken");
    const response = await createOrder(orderData, token);
    alert("Order created: " + response.orderId);
  } catch (error) {
    alert("Error: " + error.message);
  }
};
```

---

## **✨ Features Now Working**

✅ User Registration  
✅ User Login with Authentication  
✅ Get All Shops from Backend  
✅ Get Shop Details  
✅ Create Orders  
✅ Get User Orders  
✅ Update User Profile  
✅ Token-based Security  
✅ Error Handling  
✅ CORS Support  

---

## **🎯 Next Steps**

1. **Add Payment Integration** - Stripe/Razorpay
2. **Real-time Updates** - WebSockets
3. **Email Notifications** - Order confirmations
4. **Admin Dashboard** - Manage shops/orders
5. **Deployment** - Heroku/Firebase Hosting

---

## **📚 File Organization**

```
foodstreet/                          # Frontend
├── src/
│   ├── services/
│   │   └── api.js                  # ← All API calls here
│   ├── pages/
│   │   ├── Signup.jsx
│   │   ├── Login.jsx
│   │   ├── Home.jsx
│   │   └── Shop.jsx
│   ├── components/
│   │   └── Navbar.jsx
│   └── config/
│       └── firebase.js

backend/                             # Backend
├── server.js                        # ← Express app
├── routes/
│   ├── auth.js
│   ├── shops.js
│   ├── orders.js
│   └── users.js
├── controllers/                     # ← Business logic
├── middleware/                      # ← Auth & error
└── config/
    └── firebase.js                  # ← Firebase Admin
```

---

## **🚀 Your App is Ready!**

**Frontend:** `http://localhost:3000`  
**Backend:** `http://localhost:5000`  
**API Base:** `http://localhost:5000/api`  

Enjoy! 🎉
