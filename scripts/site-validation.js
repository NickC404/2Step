// The feed is third-party data, so each value is checked before it is kept.
// Links are opened by the popup, so anything that isn't an https URL is
// dropped at import time rather than shipped in the bundle. Plain http is
// dropped too: a setup guide served without TLS could be tampered with in transit.
// So are links with a username or password, which can disguise the real host
// (https://bank.com@evil.example/).
export const isHttpsUrl = (v) => {
  if (typeof v !== 'string' || !/^https:\/\//i.test(v)) return false;
  try {
    const { username, password } = new URL(v);
    return !username && !password;
  } catch {
    return false;
  }
};

export const isMethodList = (v) => Array.isArray(v) && v.every((m) => typeof m === 'string' && /^[a-z0-9-]+$/.test(m));

export const isDomain = (d) => typeof d === 'string' && /^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(d);

export const VALID = { methods: isMethodList, documentation: isHttpsUrl };
