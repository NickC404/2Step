// Shared 2FA method configuration used by SiteDetails and MethodBadge.
//
// The keys below are the method IDs used by the 2FA Directory data
// (see 2fa.directory/sites.json): sms, call, email, totp, custom-software,
// custom-hardware, u2f. Any ID not listed here falls back to methodFallback()
// and renders as "Unknown", so keep this in sync when the upstream vocabulary
// changes (scripts/update-sites.js warns when it sees an unknown ID).
export const methodConfig = {
  u2f: {
    label: 'Security Key (U2F)',
    strength: 'Best',
    strengthBadgeClass: 'bg-emerald-100 text-emerald-700',
    colorClass: 'bg-emerald-100 text-emerald-700',
    strengthOrder: 1,
    description: 'Hardware security keys and passkeys (e.g. YubiKey) offer the strongest protection and are fully phishing-resistant.',
  },
  'custom-hardware': {
    label: 'Hardware Token',
    strength: 'Best',
    strengthBadgeClass: 'bg-emerald-100 text-emerald-700',
    colorClass: 'bg-emerald-100 text-emerald-700',
    strengthOrder: 1,
    description: 'A proprietary hardware token for strong offline authentication.',
  },
  totp: {
    label: 'Authenticator App (TOTP)',
    strength: 'Strong',
    strengthBadgeClass: 'bg-sky-100 text-sky-700',
    colorClass: 'bg-sky-100 text-sky-700',
    strengthOrder: 2,
    description: 'Time-based codes from apps like Authy or Google Authenticator. Works offline and is very secure.',
  },
  'custom-software': {
    label: 'Authenticator App',
    strength: 'Strong',
    strengthBadgeClass: 'bg-sky-100 text-sky-700',
    colorClass: 'bg-sky-100 text-sky-700',
    strengthOrder: 2,
    description: "A provider-specific authenticator app, such as Duo, Authy, or the service's own app.",
  },
  email: {
    label: 'Email Code',
    strength: 'Fair',
    strengthBadgeClass: 'bg-amber-100 text-amber-800',
    colorClass: 'bg-amber-100 text-amber-700',
    strengthOrder: 4,
    description: 'A one-time code sent to your email. Security depends on your email account being secure.',
  },
  call: {
    label: 'Voice Call',
    strength: 'Fair',
    strengthBadgeClass: 'bg-amber-100 text-amber-800',
    colorClass: 'bg-amber-100 text-amber-700',
    strengthOrder: 4,
    description: 'An automated call delivers a verification code to your phone.',
  },
  sms: {
    label: 'SMS Text Code',
    strength: 'Weak',
    strengthBadgeClass: 'bg-red-100 text-red-700',
    colorClass: 'bg-red-100 text-red-700',
    strengthOrder: 5,
    description: 'Codes via SMS are vulnerable to SIM swapping. Use an authenticator app or security key instead if available.',
  },
};

export const methodFallback = (id) => ({
  label: id.toUpperCase(),
  strength: 'Unknown',
  strengthBadgeClass: 'bg-gray-100 text-gray-700',
  colorClass: 'bg-gray-50 text-gray-600',
  strengthOrder: 99,
  description: 'An additional security method used to verify your identity.',
});

export const getMethod = (id) => methodConfig[id.toLowerCase()] ?? methodFallback(id);
