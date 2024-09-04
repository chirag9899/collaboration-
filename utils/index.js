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

export function stringElipsis(string = "", maxWidth) {
  const trimedString = string?.split("-")[0];
  if (trimedString.length > maxWidth) {
    return trimedString.slice(0, maxWidth - 3) + "...";
  } else {
    return trimedString;
  }
}

export function formatNumber(num) {
  const absNum = Math.abs(num);
  const million = 1000000;
  const billion = 1000000000;
  const trillion = 1000000000000;
  const quadrillion = 1000000000000000;

  if (absNum >= quadrillion) {
    return (num / quadrillion).toFixed(2) + "Q";
  } else if (absNum >= trillion) {
    return (num / trillion).toFixed(2) + "T";
  } else if (absNum >= billion) {
    return (num / billion).toFixed(2) + "B";
  } else if (absNum >= million) {
    return (num / million).toFixed(2) + "M";
  } else if (absNum >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  } else {
    return num.toString();
  }
}

export const isValidUrl = (url) =>
  /^(?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!-)[a-zA-Z0-9-]{1,63}(?<!-)\.)+[a-zA-Z]{2,}(?::\d{1,5})?(?:\/\S*)?$/.test(
    url,
  );

export async function imageUrlToBase64(url) {
  try {
    // Fetch the image
    const response = await fetch(url);
    const blob = await response.blob();

    // Convert blob to base64
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
    });
  } catch (error) {
    console.error("Error converting image to base64:", error);
    return null;
  }
}

export function commify (value, precision = 0) {
 return parseFloat(value)
    .toFixed(precision)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
