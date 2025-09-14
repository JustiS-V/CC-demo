# ❓ Frequently Asked Questions

## 🔧 Setup and Installation

### Q: App doesn't start after installing dependencies
**A:** Try the following steps:
```bash
# Clear cache
npm start -- --clear

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Q: Error "Firebase not initialized"
**A:** Check:
1. Does `.env` file exist
2. Are Firebase variables filled correctly
3. Did you restart the app after changing `.env`

### Q: TypeScript errors after installation
**A:** 
```bash
# Restart TypeScript server
# In VS Code: Cmd+Shift+P → "TypeScript: Restart TS Server"

# Check tsconfig.json
cat tsconfig.json
```

## 🔐 Authentication Issues

### Q: SMS code not arriving
**A:** Check:
1. **Phone format:** Must be international (+7...)
2. **Firebase Console:** Phone Authentication enabled
3. **Test numbers:** Add your number to Firebase for development

### Q: Email login not working
**A:** Verify:
1. **Firebase Console:** Email/Password enabled
2. **Domain:** Added to Authorized domains
3. **Email format:** Valid email address

### Q: User cannot logout
**A:** Check AuthContext implementation:
```typescript
const { logout } = useAuth();
try {
  await logout();
  router.replace('/auth');
} catch (error) {
  Alert.alert('Error', 'Failed to logout');
}
```

## 📱 App Functionality

### Q: Icons not displaying
**A:** Check:
1. SVG files exist in `assets/icons/svg/`
2. Metro configuration includes SVG transformer
3. Icon names are correct

### Q: Navigation not working
**A:** Verify:
1. File structure matches Expo Router conventions
2. Components are properly exported
3. Navigation paths are correct

### Q: Theme switching not working
**A:** Check:
1. ColorScheme provider is set up
2. Components use ThemedView/ThemedText
3. Colors are imported correctly

## 🎨 Customization

### Q: How to add new icons?
**A:** 
1. Create SVG file in `assets/icons/svg/`
2. Add to `Icon.tsx` mapping
3. Create preset component
4. Update exports

### Q: How to customize colors?
**A:** Update `constants/theme/colors.ts`:
```typescript
export const Colors = {
  light: {
    // Your custom colors
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
  },
  dark: {
    // Dark theme colors
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
  },
};
```

### Q: How to add new screens?
**A:** 
1. Create file in `app/` directory
2. Follow Expo Router conventions
3. Add navigation if needed
4. Export component properly

## 🚀 Development

### Q: How to run on physical device?
**A:** 
```bash
# Install Expo Go app on your phone
# Run development server
npm start

# Scan QR code with Expo Go
# Or use tunnel for remote access
expo start --tunnel
```

### Q: How to build for production?
**A:** 
```bash
# Build for iOS
expo build:ios

# Build for Android
expo build:android

# Build for web
expo build:web
```

### Q: How to debug the app?
**A:** 
```bash
# Enable debug mode
expo start --dev-client

# Use React Native Debugger
# Or Chrome DevTools for web
```

## 🔧 Troubleshooting

### Q: Metro bundler errors
**A:** 
```bash
# Clear Metro cache
npx react-native start --reset-cache

# Or with Expo
expo start --clear
```

### Q: Firebase connection issues
**A:** Check:
1. Internet connection
2. Firebase project status
3. Configuration variables
4. Network security settings

### Q: Performance issues
**A:** 
1. Close other applications
2. Use release build for testing
3. Check for memory leaks
4. Optimize images and assets

## 📚 Additional Help

### Q: Where to find more documentation?
**A:** Check the `docs/` folder:
- `README.md` - Project overview
- `getting-started.md` - Setup guide
- `troubleshooting.md` - Problem solving
- `svg-icons.md` - Icon system guide

### Q: How to contribute to the project?
**A:** 
1. Fork the repository
2. Create feature branch
3. Make changes
4. Submit pull request
5. Follow coding standards

### Q: Where to report bugs?
**A:** 
1. Check existing issues
2. Create detailed bug report
3. Include system information
4. Provide reproduction steps

## 🆘 Still Need Help?

If you can't find the answer to your question:

1. **Check the documentation** in the `docs/` folder
2. **Search existing issues** on GitHub
3. **Create a new issue** with detailed description
4. **Join the community** for discussions

### Creating a Good Issue

Include:
- **Problem description**
- **Steps to reproduce**
- **Expected behavior**
- **Actual behavior**
- **System information**
- **Screenshots/logs**

### System Information Template

```bash
OS: macOS/Windows/Linux
Node.js: v18.x.x
npm: v9.x.x
Expo CLI: v6.x.x
Device: iPhone/Android/Web
```

For more help, see the [Troubleshooting Guide](./troubleshooting.md).