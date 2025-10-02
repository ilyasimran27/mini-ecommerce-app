E-Commerce Mobile App
A modern React Native e-commerce application built with Expo, Firebase, and EAS Build.

🚀 Features
✅ User Authentication with Firebase Auth

✅ Product Catalog from Fake Store API

✅ Search & Category Filtering

✅ Shopping Cart with Persistent Storage

✅ Product Details & Add to Cart

✅ Responsive Design


📋 Prerequisites
Before you begin, ensure you have:

Node.js (v20 or higher)

npm or yarn

Expo CLI

EAS CLI

Firebase account

Android Studio (for Android development)

🛠️ Installation & Setup
1. Clone and Install Dependencies

# Clone the repository
git clone https://github.com/ilyasimran27/mini-ecommerce-app.git
cd MiniEcommerceApp

# Install dependencies
npm install

# Install Expo CLI globally
npm install -g expo-cli

2. EAS Build Configuration

   Step 1: Login to Expo
   eas login

   Step 2: Configure EAS
   eas init

   Step 3: Update eas.json
   Make sure your eas.json looks like this:

 {
  "cli": {
    "version": ">= 16.17.0",
    "appVersionSource": "remote"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {}
  }
}


Step 4: Update app.json

Make sure your app.json is properly configured:

{
  "expo": {
    "name": "MiniEcommerceApp",
    "slug": "MiniEcommerceApp",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "miniecommerceapp",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "android": {
      "adaptiveIcon": {
        "backgroundColor": "#E6F4FE",
        "foregroundImage": "./assets/images/android-icon-foreground.png",
        "backgroundImage": "./assets/images/android-icon-background.png",
        "monochromeImage": "./assets/images/android-icon-monochrome.png"
      },
      "edgeToEdgeEnabled": true,
      "predictiveBackGestureEnabled": false,
      "package": "com.imran23456.MiniEcommerceApp"
    },
    "web": {
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff",
          "dark": {
            "backgroundColor": "#000000"
          }
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true,
      "reactCompiler": true
    },
    "extra": {
      "router": {},
      "eas": {
        "projectId": "fe3ee67d-7434-4083-aac1-223ce43c6270"
      }
    }
  }
}

Project Structure

MiniEcommerceApp/
├── app/                    # Expo Router file-based routing
│   ├── _layout.tsx        # Root layout with navigation
│   ├── index.tsx          # Login screen
│   ├── register.tsx       # Registration screen
│   ├── product-list.tsx   # Product listing
│   ├── product-detail.tsx # Product details
│   ├── cart.tsx           # Shopping cart
│   └── checkout.tsx       # Checkout screen
├── src/
│   ├── context/
│   │   └── CartContext.js # Cart state management
│   └── services/
│       └── authService.js # Firebase auth services
├── assets/                # App icons and images
├── firebase.js           # Firebase configuration
├── app.json             # Expo configuration
├── eas.json             # EAS Build configuration
└── package.json         # Dependencies


Development

Start Development Server


# Start Expo development server
npx expo start

# Or with clear cache
npx expo start -c

Build with EAS
Development Build

eas build --platform android --profile development
   


