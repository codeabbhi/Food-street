# 🔥 FoodStreet Backend API

## **Project Structure**

```
backend/
├── config/
│   └── firebase.js           # Firebase configuration
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── shops.js             # Shops management routes
│   ├── orders.js            # Orders routes
│   └── users.js             # User profile routes
├── controllers/
│   ├── authController.js    # Auth logic
│   ├── shopController.js    # Shops logic
│   ├── orderController.js   # Orders logic
│   └── userController.js    # User logic
├── middleware/
│   ├── authMiddleware.js    # Token verification
│   └── errorHandler.js      # Error handling
├── server.js                # Express server
├── package.json             # Dependencies
├── .env.example             # Environment template
└── README.md               # This file
```

## **Installation**

```bash
cd backend
npm install
```

## **Environment Setup**

1. Copy `.env.example` to `.env`
2. Add your Firebase credentials:

```
PORT=5000
NODE_ENV=development
FIREBASE_PROJECT_ID=your_project_id
CORS_ORIGIN=http://localhost:3000
```

## **Running the Server**

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## **API Endpoints**

### **Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user (requires token)
- `GET /api/auth/me` - Get current user (requires token)

### **Shops**
- `GET /api/shops` - Get all shops
- `GET /api/shops/:shopId` - Get shop details
- `POST /api/shops` - Create shop (admin, requires token)
- `PUT /api/shops/:shopId` - Update shop (admin, requires token)
- `DELETE /api/shops/:shopId` - Delete shop (admin, requires token)

### **Orders**
- `POST /api/orders` - Create order (requires token)
- `GET /api/orders` - Get user orders (requires token)
- `GET /api/orders/:orderId` - Get order details (requires token)
- `PATCH /api/orders/:orderId/status` - Update order status
- `POST /api/orders/:orderId/cancel` - Cancel order (requires token)

### **Users**
- `GET /api/users/profile` - Get user profile (requires token)
- `PUT /api/users/profile` - Update profile (requires token)
- `DELETE /api/users/account` - Delete account (requires token)

## **Database Collections (Firestore)**

### **users**
```json
{
  "uid": "string",
  "fullName": "string",
  "email": "string",
  "avatar": "string",
  "phone": "string",
  "address": "string",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### **shops**
```json
{
  "name": "string",
  "tagline": "string",
  "image": "string",
  "menu": [
    {
      "name": "string",
      "price": "number",
      "description": "string"
    }
  ],
  "createdAt": "timestamp"
}
```

### **orders**
```json
{
  "userId": "string",
  "shopId": "string",
  "items": [
    {
      "name": "string",
      "price": "number",
      "quantity": "number"
    }
  ],
  "totalPrice": "number",
  "status": "pending|confirmed|preparing|ready|delivered|cancelled",
  "deliveryAddress": "string",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

## **Authentication**

All protected endpoints require Bearer token in Authorization header:

```
Authorization: Bearer <token>
```

Tokens are obtained from Firebase Authentication and can be used across all API calls.

## **Error Handling**

All errors return standardized format:

```json
{
  "error": "Error message here"
}
```

## **Development Tips**

- Use Postman or Insomnia to test API endpoints
- Check browser console for frontend errors
- Use `npm run dev` for live reload during development
- All timestamps are in ISO 8601 format

## **Common Issues**

**Firebase not initialized:**
- Ensure `.env` file has correct Firebase credentials
- Check Firebase Console for project settings

**CORS errors:**
- Make sure `CORS_ORIGIN` in `.env` matches frontend URL
- Default is `http://localhost:3000`

**Token errors:**
- Verify token is sent in Authorization header
- Token must be from Firebase Authentication

## **Next Steps**

- [ ] Set up payment gateway (Stripe/Razorpay)
- [ ] Add email notifications
- [ ] Implement admin dashboard
- [ ] Add real-time updates with WebSockets
- [ ] Set up deployment (Heroku/Firebase Functions)

---

**Backend Ready!** 🚀
