# Security Policy

## Supported Versions

Only the latest release on the Chrome Web Store receives security fixes.

| Version | Supported |
|---------|-----------|
| 1.0.x   | ✅        |

## Reporting a Vulnerability

Please don't report security issues in public GitHub issues.

Report them privately through [GitHub's private vulnerability reporting](https://github.com/NickC404/2Step/security/advisories/new) instead. Include:

- what the issue is and where it is (file, permission or page)
- steps to reproduce it, and the Chrome version you used
- what an attacker could do with it

Once the issue is confirmed, a fix will be released as soon as possible, and you'll be credited in the advisory unless you'd rather not be.

## Scope

In scope: the extension's own code, its permissions, and the data it stores on the device.

Out of scope: the accuracy of the 2FA data, which comes from [2FA Directory](https://2fa.directory/). Report errors there to the [2factorauth/twofactorauth](https://github.com/2factorauth/twofactorauth) project.

## Security Model

2Step has no accounts, no server and no network requests of its own. The site list ships inside the extension, so checking a site happens entirely on the device.

### Data

| Data | Where it goes |
|------|---------------|
| Tab addresses | Read when a page finishes loading or a tab is switched to, and compared with the bundled list. Not stored, logged or sent anywhere. |
| Ticked tips | Saved as tip IDs in `chrome.storage.local`. Not synced, and removed when the extension is uninstalled. |

### Permissions

The extension requests only `tabs` and `storage`. It has no host permissions, content scripts or web-accessible resources, so websites can't read its files or embed its pages.

### Isolation

The popup's interface runs in a sandboxed page with no access to Chrome's extension APIs. A small wrapper page (`src/wrapper.js`) makes those calls on its behalf, and:

- accepts messages only from its own sandboxed frame
- opens `https` links only
- stores only the IDs of real tips

The content security policy allows scripts from the extension's own package only, and stops the popup's frame loading outside pages.

### Third-Party Data

The directory data is treated as untrusted. `scripts/site-validation.js` checks it at import: domains and method IDs must be well formed, and setup links must be `https` with no username or password. Anything else is dropped. The popup checks links again before showing them, and renders all directory text as plain text.

### Testing

`tests/security.spec.js` runs against the built extension and covers forged messages, frame navigation, poisoned directory data and whether tab addresses leave the device.
