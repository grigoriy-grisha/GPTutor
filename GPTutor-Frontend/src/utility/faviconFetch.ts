const ICON_SIZES = {
  small: [0, 64],
  medium: [65, 192],
  big: [193, 1000],
};

export function faviconFetch({
  hostname,
  uri,
  size,
  apikey,
  fallbackText,
  fallbackBg,
}: any = {}) {
  return `https://icons.duckduckgo.com/ip3/${new URL(uri).hostname}.ico`;
}
