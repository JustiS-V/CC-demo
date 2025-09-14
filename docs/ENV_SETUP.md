# 🔧 Environment Variables Setup

## 📋 What You Need to Do

### 1. Copy Configuration File
```bash
cp .env.example .env
```

### 2. Fill Variables in `.env`

Open `.env` file and replace values with your data from Firebase Console:

```env
# Firebase Configuration
FIREBASE_API_KEY=AIzaSyC... # Your API key
FIREBASE_AUTH_DOMAIN=crazy-cooker-12345.firebaseapp.com
FIREBASE_PROJECT_ID=crazy-cooker-12345
FIREBASE_STORAGE_BUCKET=crazy-cooker-12345.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789012
FIREBASE_APP_ID=1:123456789012:web:abcdef123456
FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# API Configuration
API_BASE_URL=http://localhost:3000/api
NODE_ENV=development
```

### 3. Verify Configuration

Check that all variables are filled:

```bash
# Check .env file
cat .env

# Verify no empty values
grep -E "^[A-Z_]+=$" .env
```

## 🔥 Firebase Setup

### Getting Firebase Configuration

1. **Go to Firebase Console** → [console.firebase.google.com](https://console.firebase.google.com)
2. **Select your project** or create new one
3. **Go to Project Settings** (gear icon)
4. **Scroll to "Your apps"** section
5. **Click "Add app"** → Web app
6. **Register app** with name: `crazy-cooker-web`
7. **Copy configuration** object

### Firebase Configuration Values

| Variable | Description | Where to Find |
|----------|-------------|---------------|
| `FIREBASE_API_KEY` | Firebase API key | Project Settings → General → Web API Key |
| `FIREBASE_AUTH_DOMAIN` | Authentication domain | Project Settings → General → Project ID |
| `FIREBASE_PROJECT_ID` | Project identifier | Project Settings → General → Project ID |
| `FIREBASE_STORAGE_BUCKET` | Storage bucket | Project Settings → General → Storage bucket |
| `FIREBASE_MESSAGING_SENDER_ID` | Messaging sender ID | Project Settings → General → Sender ID |
| `FIREBASE_APP_ID` | App identifier | Project Settings → General → App ID |
| `FIREBASE_MEASUREMENT_ID` | Analytics ID | Project Settings → General → Measurement ID |

## 🔐 Authentication Setup

### Enable Authentication Methods

1. **Go to Authentication** → Sign-in method
2. **Enable Email/Password:**
   - Click on Email/Password
   - Enable first option
   - Save

3. **Enable Phone Authentication:**
   - Click on Phone
   - Enable Phone authentication
   - Add test phone numbers for development

### Test Phone Numbers

For development, add test numbers in Firebase Console:

```
Phone Number: +79123456789
Verification Code: 123456
```

## 🌐 API Configuration

### Development Environment

```env
# Development API
API_BASE_URL=http://localhost:3000/api
NODE_ENV=development
```

### Production Environment

```env
# Production API
API_BASE_URL=https://api.crazy-cooker.com/api
NODE_ENV=production
```

## 🔧 Troubleshooting

### Common Issues

1. **Variables not loading**
   ```bash
   # Check babel.config.js
   cat babel.config.js
   
   # Should contain:
   plugins: [
     ['module:react-native-dotenv', {
       moduleName: '@env',
       path: '.env',
     }]
   ]
   ```

2. **Firebase not initialized**
   ```bash
   # Check .env file exists
   ls -la .env
   
   # Check variables are not empty
   grep -v "^#" .env | grep -v "^$"
   ```

3. **Import errors**
   ```typescript
   // Check import statement
   import { FIREBASE_API_KEY } from '@env';
   
   // Verify types
   declare module '@env' {
     export const FIREBASE_API_KEY: string;
     export const FIREBASE_AUTH_DOMAIN: string;
     // ... other variables
   }
   ```

### Verification Commands

```bash
# Check if .env exists
ls -la .env

# Check if variables are loaded
node -e "console.log(process.env.FIREBASE_API_KEY)"

# Verify Firebase config
node -e "
const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID
};
console.log('Config:', config);
"
```

## 🚀 Next Steps

After setting up environment variables:

1. **Restart development server**
   ```bash
   npm start -- --clear
   ```

2. **Test Firebase connection**
   - Try to sign in
   - Check console for errors

3. **Verify authentication**
   - Test email/password login
   - Test phone number verification

4. **Check API endpoints**
   - Verify API calls work
   - Check network requests

## 📚 Additional Resources

- [Firebase Setup Guide](./FIREBASE_SETUP.md)
- [Environment Variables Documentation](https://docs.expo.dev/guides/environment-variables/)
- [Firebase Configuration Guide](https://firebase.google.com/docs/web/setup)

For more help, see the [Troubleshooting Guide](./troubleshooting.md).