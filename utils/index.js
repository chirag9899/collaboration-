export function noop() {}

// TODO: this should from @osn/common
export function capitalize(string = "") {
  return string.slice(0, 1).toUpperCase() + string.slice(1);
}

export function waitFor(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function urlCreator(endpoint, string) {
  return `https://blockchair.com/bitcoin/${endpoint}/${string}`;
}

export function stringElipsis(string, maxWidth) {
  const trimedString = string.split("-")[0];
  if (trimedString.length > maxWidth) {
    return trimedString.slice(0, maxWidth - 3) + "...";
  } else {
    return trimedString;
  }
}

export const isValidUrl = (url) =>
  /^(?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!-)[a-zA-Z0-9-]{1,63}(?<!-)\.)+[a-zA-Z]{2,}(?::\d{1,5})?(?:\/\S*)?$/.test(
    url,
  );
