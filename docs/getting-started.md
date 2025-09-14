# 🚀 Quick Start

This guide will help you quickly get Crazy Cooker running on your device.

## ⚡ Quick Installation

### Prerequisites

- **Node.js** version 18+
- **npm** or **yarn**
- **Expo CLI** (`npm install -g @expo/cli`)
- **Firebase account** (for authentication)

### 1. Clone Repository

```bash
git clone https://github.com/your-username/crazy-cooker.git
cd crazy-cooker
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create `.env` file in project root:

```env
# Firebase Configuration
FIREBASE_API_KEY=your_api_key_here
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. Start Development Server

```bash
npm start
# or
yarn start
```

### 5. Run on Device

- **iOS:** Install Expo Go app, scan QR code
- **Android:** Install Expo Go app, scan QR code
- **Web:** Press `w` in terminal or visit localhost

## 🔧 Development Setup

### VS Code Extensions

Recommended extensions for development:

```json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint"
  ]
}
```

### Project Structure

```
crazy-cooker/
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Tab navigation
│   ├── auth.tsx           # Authentication screen
│   └── verify-code.tsx    # Code verification
├── components/            # React components
│   ├── atoms/            # Basic components
│   ├── molecules/        # Composite components
│   └── organisms/        # Complex components
├── constants/            # App constants
│   ├── api/             # API configuration
│   └── styles/          # Styling constants
├── contexts/             # React contexts
├── hooks/               # Custom hooks
├── lib/                 # Utility functions
├── assets/              # Static assets
│   └── icons/           # SVG icons
└── docs/                # Documentation
```

## 🎯 Key Features

### Authentication

- Email/password login
- Phone number verification
- Secure user sessions

### Recipe Management

- Browse recipe catalog
- Search and filter recipes
- Save favorites

### AI Integration

- AI-powered recipe generation
- Smart cooking suggestions
- Personalized recommendations

### Cross-Platform

- iOS native app
- Android native app
- Web application

## 🚀 First Steps

### 1. Explore the App

After starting the development server:

1. **Open the app** on your device
2. **Create an account** or sign in
3. **Browse recipes** in the catalog
4. **Try the AI chat** for recipe generation
5. **Check your profile** settings

### 2. Development Workflow

```bash
# Start development
npm start

# Run on specific platform
npm run ios
npm run android
npm run web

# Build for production
npm run build
```

### 3. Code Changes

The app uses **Hot Reload** - changes to your code will automatically update the app:

1. **Edit components** in `components/` folder
2. **Modify screens** in `app/` folder
3. **Update styles** in `constants/styles/`
4. **See changes** instantly in the app

## 🔧 Configuration

### Firebase Setup

1. **Create Firebase project** at [console.firebase.google.com](https://console.firebase.google.com)
2. **Enable Authentication** with Email/Password and Phone
3. **Get configuration** from Project Settings
4. **Add to `.env`** file

### Environment Variables

```env
# Development
NODE_ENV=development

# Firebase
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id

# API Configuration
API_BASE_URL=http://localhost:3000/api
```

## 📱 Platform-Specific Setup

### iOS Development

```bash
# Install iOS simulator
npm install -g ios-sim

# Run on iOS simulator
npm run ios
```

### Android Development

```bash
# Install Android Studio
# Set up Android SDK
# Create virtual device

# Run on Android emulator
npm run android
```

### Web Development

```bash
# Run web version
npm run web

# Or start with web flag
npm start -- --web
```

## 🛠 Troubleshooting

### Common Issues

1. **App won't start**

   ```bash
   # Clear cache and reinstall
   rm -rf node_modules
   npm install
   npm start -- --clear
   ```

2. **Firebase errors**
   - Check `.env` file exists
   - Verify Firebase configuration
   - Restart development server

3. **Build errors**

   ```bash
   # Clear Expo cache
   expo start --clear

   # Reset Metro cache
   npx react-native start --reset-cache
   ```

### Getting Help

- **Documentation:** Check `docs/` folder
- **Issues:** Search GitHub issues
- **Community:** Join discussions
- **Support:** Create detailed issue

## 🎉 Next Steps

Now that you have Crazy Cooker running:

1. **Read the documentation** in `docs/` folder
2. **Explore the codebase** structure
3. **Try modifying** components
4. **Add new features** to the app
5. **Deploy** to production

### Useful Commands

```bash
# Development
npm start              # Start development server
npm run ios           # Run on iOS
npm run android       # Run on Android
npm run web           # Run on web

# Building
npm run build         # Build for production
npm run build:ios     # Build iOS app
npm run build:android # Build Android app

# Utilities
npm run lint          # Run ESLint
npm run type-check    # TypeScript check
npm run test          # Run tests
```

### Documentation

- [README](./README.md) - Project overview
- [Component Architecture](./component-architecture.md) - Component system
- [SVG Icons](./svg-icons.md) - Icon system
- [Troubleshooting](./troubleshooting.md) - Problem solving
- [FAQ](./faq.md) - Common questions

Welcome to Crazy Cooker development! 🍳
