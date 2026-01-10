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
Made with ❤️ by [Nick Cotterill](https://nickcotterill.co.uk)