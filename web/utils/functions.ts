export const roundOff = (number: number, decimalPlaces: number) => {
  return Math.round(number * 10 ** decimalPlaces) / 10 ** decimalPlaces;
};

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const sleep = (seconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

export const getRandomItemFromArray = <T>(array: T[]) => {
  return array[getRandomNumber(0, array.length - 1)];
};

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

export const openLinkInNewTab = (url: string) => {
  window.open(url, '_blank');
};

export const max = (a: number, b: number) => {
  return a > b ? a : b;
};

export const min = (a: number, b: number) => {
  return a < b ? a : b;
};

export const randomId = () => Math.floor(Math.random() * 1000000000);

export const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
