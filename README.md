# 2Step - Privacy-First 2FA Checker

[![Playwright Tests](https://github.com/NickC404/2Step/actions/workflows/playwright.yml/badge.svg)](https://github.com/NickC404/2Step/actions/workflows/playwright.yml)

**2Step** is a lightweight, privacy-focused browser extension that helps you identify which websites support Two-Factor Authentication (2FA) and guides you on how to set it up.

## 🛡️ Privacy Focused
Unlike many other extensions that track your browsing history to provide "useful" features, **2Step works entirely locally**. 
- **No data collection**: Your browsing history never leaves your device.
- **Local Database**: The entire 2FA directory is bundled within the extension.
- **No External API Calls**: Website checks are performed against the local database, ensuring your privacy is never compromised.

## ✨ Features
- **Automatic Detection**: Instantly see if the website you are currently visiting supports 2FA.
- **Method Breakdown**: Understand exactly which 2FA methods are supported (e.g., TOTP, Security Keys, SMS, Email).
- **Direct Documentation**: Quick links to the official 2FA setup guides for thousands of websites.
- **Searchable Directory**: Search through a comprehensive database of sites to check their security features before you even visit them.
- **Security Education**: Built-in FAQs and prioritized security tips to help you stay safe online.

## 🚀 Tech Stack
- **Frontend**: [Vue 3](https://vuejs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Build Tool**: [esbuild](https://esbuild.github.io/)
- **Testing**: [Playwright](https://playwright.dev/)

## 📊 Data Source
2Step uses the incredible data provided by the [2FA Directory](https://2fa.directory/).

---

## 🛠️ Installation (Development Mode)

Since this extension is in development, you can load it into your browser manually:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/NickC404/2Step.git
   cd 2Step
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Build the project**:
   ```bash
   npm run build
   ```
4. **Load in Chrome**:
   - Open `chrome://extensions/`.
   - Enable "Developer mode" (top right).
   - Click "Load unpacked" and select the `2Step` project folder.

## 🔧 Development

### Available Commands

```bash
# Build the extension
npm run build

# Build CSS only
npm run build:css

# Build JavaScript only
npm run build:js

# Development mode with watch
npm run dev

# Run tests
npm test
```

### Project Structure

```
2Step/
├── src/              # Vue components and source files
├── popup/            # Extension popup UI
├── tests/            # Playwright test suite
├── dist/             # Built extension (generated)
├── 2fa.directory/    # 2FA data source
└── background.js     # Extension service worker
```

## 🧪 Testing

2Step has comprehensive test coverage using Playwright for end-to-end testing.

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npx playwright test tests/search.spec.js

# Run with UI mode (for debugging)
npx playwright test --ui

# Run specific test by name
npx playwright test -g "should filter search results"
```

### Test Coverage

Our test suite includes **~70 tests** across 8 files, covering:

- ✅ **Background Service Worker** (`background.spec.js`) - Icon updates and tab detection
- ✅ **Search & Filtering** (`search.spec.js`) - Case-insensitive search, partial matches, edge cases
- ✅ **Site Details** (`site-details.spec.js`) - 2FA method display, navigation, setup guides
- ✅ **Accessibility** (`accessibility.spec.js`) - Keyboard navigation, loading states, UX
- ✅ **Edge Cases** (`edge-cases.spec.js`) - Error handling, special characters, subdomain detection
- ✅ **Components** (`components.spec.js`) - Method badges, tooltips, tab bar, input fields, icons
- ✅ **Data Integration** (`data-integration.spec.js`) - Data loading, domain normalization, message passing
- ✅ **Core Functionality** (`main.spec.js`) - Tab switching, FAQ, tips, basic features

**Coverage**: 100% of user-facing features

### CI/CD Integration

Tests run automatically on:
- ✅ Push to `main` or `master` branch
- ✅ Pull requests
- ✅ Uses GitHub Actions with automated browser setup

See the [Testing Quick Reference](TESTING_QUICK_REFERENCE.md) for detailed test documentation.

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to get started.

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---
Made with ❤️ by [Nick Cotterill](https://nickcotterill.co.uk)