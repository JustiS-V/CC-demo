# Firebase Authentication Setup

## 🔥 Firebase Setup for Crazy Cooker

### 1. Creating Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create project"
3. Enter project name: `crazy-cooker`
4. Enable Google Analytics (optional)
5. Create project

### 2. Authentication Setup

1. In the left menu select "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable the following methods:
   - **Email/Password** - for email login
   - **Phone** - for phone number login

### 3. Phone Authentication Setup

1. Click on "Phone" provider
2. Enable Phone authentication
3. Add test phone numbers for development:
   - Format: `+79123456789`
   - Verification code: `123456`

### 4. Email Authentication Setup

1. Click on "Email/Password" provider
2. Enable Email/Password authentication
3. Enable Email link (passwordless sign-in) if needed

### 5. Getting Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Add app" → Web app
4. Register app with name: `crazy-cooker-web`
5. Copy configuration object

### 6. Environment Variables

Create `.env` file in project root:

```env
FIREBASE_API_KEY=your_api_key_here
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 7. Testing Authentication

```typescript
// Test email/password authentication
import { signInWithEmailAndPassword } from 'firebase/auth';

const testLogin = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      'test@example.com',
      'password123'
    );
    console.log('Login successful:', userCredential.user);
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

### 8. Phone Authentication Testing

```typescript
// Test phone authentication
import { signInWithPhoneNumber } from 'firebase/auth';

const testPhoneAuth = async () => {
  try {
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      '+79123456789'
    );
    // Enter verification code
    const result = await confirmationResult.confirm('123456');
    console.log('Phone auth successful:', result.user);
  } catch (error) {
    console.error('Phone auth failed:', error);
  }
};
```

## 🔧 Troubleshooting

### Common Issues

1. **"Firebase not initialized"**
   - Check if `.env` file exists
   - Verify all environment variables are set
   - Restart the application

2. **Phone verification not working**
   - Check phone number format (+7...)
   - Verify test numbers in Firebase Console
   - Check Firebase project settings

3. **Email authentication failing**
   - Verify Email/Password is enabled
   - Check email format
   - Verify Firebase configuration

### Security Rules

For production, configure Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Recipes are public for reading
    match /recipes/{recipeId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 📱 Platform-Specific Setup

### iOS Setup

1. Add iOS app in Firebase Console
2. Download `GoogleService-Info.plist`
3. Add to `ios/` folder
4. Update `ios/Runner/Info.plist`

### Android Setup

1. Add Android app in Firebase Console
2. Download `google-services.json`
3. Add to `android/app/` folder
4. Update `android/app/build.gradle`

### Web Setup

1. Add Web app in Firebase Console
2. Copy configuration to `.env`
3. Update `firebase.config.ts`

## 🚀 Next Steps

1. Test authentication flows
2. Implement user profile management
3. Add data persistence with Firestore
4. Set up security rules
5. Deploy to production

For more information, see the [Firebase Documentation](https://firebase.google.com/docs).
