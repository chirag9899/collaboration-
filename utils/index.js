export function noop() {}

// TODO: this should from @osn/common
export function capitalize(string = "") {
  return string.slice(0, 1).toUpperCase() + string.slice(1);
}

export function waitFor(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function urlCreator(endpoint,string) {
  return `https://blockchair.com/bitcoin/${endpoint}/${string}`
}

export function stringElipsis(string, maxWidth) {
  if (string.length > maxWidth) {
      return string.slice(0, maxWidth - 3) + '...';
  } else {
      return string;
  }
}
