# 🔧 Troubleshooting

This document will help solve typical problems when developing and using Crazy Cooker.

## 🚨 Critical Errors

### Firebase Not Initializing

**Symptoms:**
- Error "Firebase not initialized"
- App doesn't start
- Authorization problems

**Solution:**

```bash
# 1. Check .env file
cat .env

# 2. Make sure all variables are filled
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
# ... other variables

# 3. Restart the application
npm start -- --clear
```

### Environment Variables Not Loading

**Symptoms:**
- Variables are undefined
- Import errors @env

**Solution:**

```bash
# 1. Check babel.config.js
cat babel.config.js

# 2. Reinstall dependencies
rm -rf node_modules
npm install

# 3. Clear cache
npm start -- --clear
```

## 🔐 Authorization Problems

### SMS Code Not Arriving

**Check:**
1. **Number format:** Must be international (+7...)
2. **Firebase Console:** Phone Authentication enabled
3. **Test numbers:** For development add number to Firebase

**Solution:**

```typescript
// Correct number format
const phoneNumber = '+79123456789'; // ✅ Correct
const phoneNumber = '79123456789';  // ❌ Wrong
const phoneNumber = '9123456789';   // ❌ Wrong
```

### Email Authorization Not Working

**Check:**
1. **Firebase Console:** Email/Password enabled
2. **Domain:** Added to Authorized domains
3. **Email:** Correct format

**Solution:**

```bash
# In Firebase Console:
# Authentication → Settings → Authorized domains
# Add: localhost, your-domain.com
```

### User Cannot Logout

**Symptoms:**
- "Logout" button doesn't work
- User remains authorized

**Solution:**

```typescript
// Check AuthContext
const { logout } = useAuth();

// Add error handling
try {
  await logout();
  router.replace('/auth');
} catch (error) {
  // Show error to user
  Alert.alert('Error', 'Failed to logout');
}
```

## 📱 App Problems

### App Not Starting

**Symptoms:**
- White screen
- Console errors
- App crashes

**Solution:**

```bash
# 1. Clear cache
npm start -- --clear

# 2. Reinstall dependencies
rm -rf node_modules
npm install

# 3. Check Node.js version
node --version  # Should be 18+

# 4. Update Expo CLI
npm install -g @expo/cli@latest
```

### Slow Performance

**Causes:**
- Many open applications
- Slow internet connection
- Firebase problems

**Solution:**

```bash
# 1. Close other applications
# 2. Check internet connection
# 3. Use local development
expo start --localhost
```

### Navigation Errors

**Symptoms:**
- Screen doesn't open
- Routing errors
- Tab problems

**Solution:**

```typescript
// Check file structure
app/
  (tabs)/
    index.tsx
    chat.tsx
    profile.tsx
  auth.tsx
  verify-code.tsx

// Make sure exports are correct
export default function HomeScreen() {
  return <ThemedView>...</ThemedView>;
}
```

## 🛠 Development Problems

### TypeScript Errors

**Symptoms:**
- Type errors
- Import problems
- Unknown types

**Solution:**

```bash
# 1. Check tsconfig.json
cat tsconfig.json

# 2. Restart TypeScript server
# In VS Code: Cmd+Shift+P → "TypeScript: Restart TS Server"

# 3. Check environment variable types
declare module '@env' {
  export const FIREBASE_API_KEY: string;
  export const FIREBASE_AUTH_DOMAIN: string;
  // ... other variables
}
```

### Style Problems

**Symptoms:**
- Styles not applied
- StyleSheet errors
- Theme problems

**Solution:**

```typescript
// Use ThemedView and ThemedText
import { ThemedView, ThemedText } from '@/components/themed-view';

// Check Colors constants
import { Colors } from '@/constants/theme/colors';
```

### Icon Problems

**Symptoms:**
- Icons not displaying
- IconSymbol errors

**Solution:**

```typescript
// Use correct icon names
<IconSymbol name="house.fill" size={24} />

// Check available icons
import { Icon } from '@/components/atoms';
<Icon name="chef-hat" size={24} />
```

## 🌐 Network Problems

### Firebase Unavailable

**Symptoms:**
- Request timeouts
- Connection errors
- Authorization problems

**Solution:**

```bash
# 1. Check internet connection
ping google.com

# 2. Check Firebase status
# Visit: https://status.firebase.google.com/

# 3. Check configuration
cat .env
```

### CORS Errors (Web)

**Symptoms:**
- CORS errors in browser
- Requests blocked

**Solution:**

```bash
# In Firebase Console:
# Authentication → Settings → Authorized domains
# Add your domain
```

## 📊 Debugging

### Enable Logs

```typescript
// In development mode
if (__DEV__) {
  console.log('Debug info:', data);
}

// For Firebase
import { getApps } from 'firebase/app';
console.log('Firebase apps:', getApps());
```

### Using React Native Debugger

```bash
# Install React Native Debugger
npm install -g react-native-debugger

# Run with debugger
expo start --dev-client

# Then open React Native Debugger
```

### Check State

```typescript
// Check authorization state
import { useAuth } from '@/contexts/AuthContext';
const { user, isLoading } = useAuth();
console.log('User:', user);
console.log('Loading:', isLoading);

// Check environment variables
console.log('API Key:', process.env.FIREBASE_API_KEY);
```

## 🆘 When to Ask for Help

### Create Issue if:
- Problem not solved by standard methods
- Error reproduces consistently
- Problem is critical for app functionality

### Include in Issue:
1. **Problem description**
2. **Steps to reproduce**
3. **Expected behavior**
4. **Actual behavior**
5. **Logs and errors**
6. **System information**
7. **Screenshots (if applicable)**

### System Information:

```bash
# Collect this information
node --version
npm --version
expo --version
cat package.json
cat .env.example
```

**Still not working?** Create an [Issue](https://github.com/your-repo/crazy-cooker/issues) with detailed problem description!