# Chrome Web Store Listing — 2Step

> Last Updated: 2026-10-08

Everything needed to fill in the Chrome Developer Dashboard. Items marked **TODO** still need a decision or a value from you. This file is not shipped: the build only copies the extension's own files into `dist/`.

## Store Listing

**Extension Name**
2Step

**Short Description** (132 characters max; taken from `manifest.json`)
See whether the site you're on supports two-factor authentication, which methods it offers, and how to turn it on.

**Detailed Description**
Paste the contents of `store-assets/description.txt`. It is plain text, because the store strips formatting, and it keeps "2FA" and "two-factor authentication" under the keyword-repetition limit.

**Category**
Privacy & Security. **TODO**: confirm this is offered in the dashboard's category list; if not, use Tools.

**Single Purpose**
Shows whether the website in the current tab supports two-factor authentication, which methods it offers, and how to enable it.

**Primary Language**
English

## Graphics & Assets

| Asset | Dimensions | Status | Filename |
|-------|-----------|--------|----------|
| Store Icon | 128×128 PNG | ✅ Ready | `icons/icon128.png` |
| Screenshot 1 | 1280×800 | ✅ Ready | `store-assets/screenshot-1.png` |
| Screenshot 2 | 1280×800 | ✅ Ready | `store-assets/screenshot-2.png` |
| Screenshot 3 | 1280×800 | ✅ Ready | `store-assets/screenshot-3.png` |
| Screenshot 4 | 1280×800 | ✅ Ready | `store-assets/screenshot-4.png` |
| Screenshot 5 | 1280×800 | ⬜ Not created | |
| Small Promo Tile | 440×280 | ✅ Ready | `store-assets/promo-small.png` |
| Marquee Promo Tile | 1400×560 | ⬜ Not created | |

Regenerate the screenshots and tile with `npm run build && npm run gen:store-assets` whenever the popup's appearance changes.

### Screenshot Notes

1. github.com shown as supported, with its methods ranked by strength and a legend for the toolbar icon.
2. archive.org shown as not supported, with the advice card.
3. Directory search for "bank".
4. Tips checklist with two items ticked.

The popup in each image is captured from the real built extension; only the active tab's address is set for the capture.

## Permissions Justification

| Permission | Type | Justification |
|------------|------|---------------|
| `tabs` | permissions | Reads the address of the active tab so the extension can look up that site's domain in a list bundled with the extension, then colours the toolbar icon (green, red or grey) and fills in the popup with the result. The icon updates on every tab without a click, which `activeTab` cannot do. The address is never stored or transmitted. |
| `storage` | permissions | Saves which items the user has ticked in the Tips checklist, so their progress is still there the next time they open the popup. Stored on the device only. |

There are no host permissions and no content scripts.

**Remote code**: No. All code is in the package, and the extension makes no network requests.

## Privacy & Data Use

### Data Collection

**Does the extension collect user data?** No

The active tab's address is read on the device and compared with a bundled list. It is not saved, logged or sent anywhere, so nothing in the table below is collected.

| Data Type | Collected? | Transmitted Off-Device? | Purpose | Shared with Third Parties? |
|-----------|-----------|------------------------|---------|---------------------------|
| Personally identifiable info | No | No | | No |
| Health info | No | No | | No |
| Financial info | No | No | | No |
| Authentication info | No | No | | No |
| Personal communications | No | No | | No |
| Location | No | No | | No |
| Web history | No | No | | No |
| User activity | No | No | | No |
| Website content | No | No | | No |

### Data Use Certification

- [x] Data is NOT sold to third parties
- [x] Data is NOT used for purposes unrelated to the extension's core functionality
- [x] Data is NOT used for creditworthiness or lending purposes

## Privacy Policy

**Privacy Policy URL**
https://github.com/NickC404/2Step/blob/main/store-assets/privacy-policy.md

The policy is required because the extension handles the active tab's address, even though nothing leaves the device. The link must open for a signed-out visitor, so the repository has to be public.

## Distribution

**Visibility**: **TODO**: Unlisted or Private for a beta, then Public.
**Regions**: All regions

## Developer Info

**Publisher Name**
**TODO**

**Contact Email**
**TODO**: shown publicly on the listing; an alias that forwards to your inbox keeps your main address private.

**Support URL**
https://github.com/NickC404/2Step/issues

**Homepage URL**
https://github.com/NickC404/2Step

## Version History

| Version | Date | Changes | Status |
|---------|------|---------|--------|
| 1.0.0 | | First release: current-site check with toolbar icon, directory search, FAQ, tips checklist, light and dark schemes. | Draft |

## Review Notes

### Known Issues / Limitations

- Requires Chrome 123 or later (`minimum_chrome_version` in the manifest).
- Site data comes from 2FA Directory and is bundled at build time, so it is only as current as the last `npm run update:sites`.
- The name is close to Google's "2-Step Verification". The listing states that 2Step is independent and not affiliated with Google.

### Rejection History

None.
