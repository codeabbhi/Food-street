# 🔥 Firebase Setup Guide for FoodStreet

## Step-by-Step Firebase Configuration

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Add project"**
3. Enter project name: `foodstreet` (or any name you prefer)
4. Accept the terms and click **"Create project"**
5. Wait for project creation to complete

### 2. Enable Authentication
1. In Firebase Console, go to **Authentication** (left sidebar)
2. Click **"Get Started"**
3. Click **Email/Password** provider
4. Toggle **Enable** and click **Save**

### 3. Create Firestore Database
1. Go to **Firestore Database** (left sidebar)
2. Click **"Create database"**
3. Select **Start in production mode**
4. Choose your region (closest to you) and click **Enable**

### 4. Set Firestore Security Rules
1. In Firestore, go to **Rules** tab
2. Replace the existing rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
      allow create: if request.auth.uid != null;
    }
  } 
}
```

3. Click **Publish**

### 5. Get Firebase Credentials
1. Click the **Settings icon** (gear icon) in top-left
2. Click **Project Settings**
3. Go to **General** tab
4. Scroll down to find "Your apps" section
5. Click the **Web icon** (`</>`) to create a web app
6. Register your app (enter name: `foodstreet`)
7. Copy the Firebase config object

### 6. Update firebase.js Configuration
1. Open `src/config/firebase.js`
2. Replace the `firebaseConfig` object with your credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 7. Test the Setup
1. Run your app: `npm start`
2. Go to `/signup` and create a test account
3. Check Firebase Console → Firestore → Collections → `users` (you should see your user data)
4. Go to `/login` and verify you can log in

## 📊 User Data Structure in Firestore

When a user signs up, their data is stored as:

```
users/
  └── {uid}/
      ├── uid: string
      ├── fullName: string
      ├── email: string
      ├── createdAt: timestamp
      └── avatar: string (auto-generated avatar URL)
```

## 🔒 Security Features

✅ **Firebase Authentication** - Secure password hashing  
✅ **Firestore Security Rules** - Users can only access their own data  
✅ **No Plain Passwords** - Passwords never stored in database  
✅ **Encrypted Connection** - All data transmitted securely  

## 🐛 Troubleshooting

**Error: "Firebase config not found"**
- Make sure you've updated `src/config/firebase.js` with your credentials

**Error: "Permission denied"**
- Check your Firestore security rules are correct
- Make sure user is authenticated

**Error: "Email already in use"**
- User already has an account with that email - use login page

## 🚀 Features Now Working

✅ User Registration (Signup)  
✅ User Login  
✅ Cloud Data Storage (Firestore)  
✅ Secure Authentication  
✅ User Profile Management  
✅ Auto-generated Avatars  

## 📱 Additional Features to Add Later

- Email verification
- Password reset
- User profile page
- Update user information
- Delete account
- Social login (Google, GitHub, etc.)

---

**Firebase is completely FREE for small projects!** You get:
- 50,000 read/write operations per day
- 1GB of stored data
- 1GB of bandwidth per month

For more info: https://firebase.google.com/pricing
