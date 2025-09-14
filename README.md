# 🍳 Crazy Cooker

A modern React Native application for recipe management and AI-powered recipe generation.

## 🚀 Features

- **Recipe Catalog** - Browse and manage your favorite recipes
- **AI Recipe Generator** - Create new recipes using artificial intelligence
- **User Profiles** - Personalized user accounts and preferences
- **Firebase Integration** - Secure authentication and data storage
- **Modern UI** - Beautiful interface built with Atomic Design principles
- **SVG Icons** - Scalable vector graphics support
- **Multi-language Support** - Internationalization with English and Russian

## 📱 Screenshots

*Coming soon...*

## 🛠 Tech Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **TypeScript** - Type-safe JavaScript
- **Firebase** - Backend services and authentication
- **React Navigation** - Navigation library
- **SVG Icons** - Scalable vector graphics
- **i18next** - Internationalization framework
- **AsyncStorage** - Local data persistence

## 📦 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/crazy-cooker.git
cd crazy-cooker
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env
# Edit .env with your Firebase configuration
```

4. **Start the development server:**
```bash
npm start
```

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project
2. Enable Authentication (Email/Password and Phone)
3. Copy your Firebase config to `.env`
4. See [Firebase Setup Guide](./docs/firebase-setup.md) for detailed instructions

### Environment Variables
```env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

## 📚 Documentation

- [Quick Start Guide](./docs/getting-started.md)
- [Component Architecture](./docs/component-architecture.md)
- [SVG Icons Guide](./docs/svg-icons.md)
- [Firebase Setup](./docs/firebase-setup.md)
- [Environment Variables](./docs/environment-variables.md)
- [Internationalization Guide](./docs/i18n-guide.md)

## 🏗 Project Structure

```
crazy-cooker/
├── app/                    # Expo Router pages
├── components/             # React components
│   ├── atoms/             # Basic components
│   ├── molecules/         # Composite components
│   └── organisms/         # Complex components
├── constants/             # App constants
│   ├── api/              # API configuration
│   ├── styles/           # Styling constants
│   └── theme/            # Theme constants
├── contexts/              # React contexts
├── hooks/                 # Custom hooks
├── lib/                   # Utility libraries
├── locales/               # Translation files
├── assets/                # Static assets
└── docs/                  # Documentation
```

## 🎨 Design System

The app follows Atomic Design principles:

- **Atoms** - Basic UI elements (Button, Input, Text, Card)
- **Molecules** - Simple groups of atoms (SearchBar, RecipeCard)
- **Organisms** - Complex components (Header, TabBar)

## 🔐 Authentication

The app supports multiple authentication methods:

- Email/Password authentication
- Phone number verification
- Social login (coming soon)

## 🌍 Internationalization

The app supports multiple languages with automatic detection:

- **English** (en) - Default language
- **Russian** (ru) - Full translation support
- **Language Switcher** - Easy language switching in profile
- **Automatic Detection** - Uses device locale settings
- **Persistent Storage** - Remembers language preference

See [Internationalization Guide](./docs/i18n-guide.md) for detailed information.

## 📱 Navigation

The app uses a tab-based navigation with:

- **Recipe Catalog** - Browse recipes
- **AI Chat** - Generate new recipes
- **Profile** - User account management

## 🚀 Development

### Available Scripts

```bash
npm start          # Start Expo development server
npm run android    # Run on Android device/emulator
npm run ios        # Run on iOS device/simulator
npm run web        # Run on web browser
npm run build      # Build for production
```

### Code Style

The project uses:
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Atomic Design for component organization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Expo](https://expo.dev/) for the amazing development platform
- [Firebase](https://firebase.google.com/) for backend services
- [React Native](https://reactnative.dev/) for cross-platform development
- [SVG Icons](https://heroicons.com/) for beautiful icons

## 📞 Support

If you have any questions or issues:

1. Check the [FAQ](./docs/faq.md)
2. Look at [Troubleshooting](./docs/troubleshooting.md)
3. Create an [Issue](https://github.com/your-username/crazy-cooker/issues)

---

**Made with ❤️ for food lovers**