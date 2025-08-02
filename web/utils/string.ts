export function toCamelCase(string: string) {
  return string.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));
}

export function toKebabCase(string: string) {
  return string
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

export function toSnakeCase(string: string) {
  return string
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
}

export function removeSpecialChars(string: string) {
  return string.replace(/[^a-zA-Z0-9 ]/g, '');
}

export function isEmpty(string: string) {
  return !string || string.trim().length === 0;
}

export function truncate(string: string, length: number, suffix = '...') {
  if (!string || string.length <= length) return string;
  return string.slice(0, length).trim() + suffix;
}

export const slugify = (text: string) =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text

export const enumToText = (text: string) => {
  return text
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const parseMessage = (message: string) => {
  if (!message) return '';
  if (!message.includes('_')) {
    return message.charAt(0).toUpperCase() + message.slice(1).toLowerCase();
  }
  const parsedMessage = message
    ?.split('_')
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    ?.join(' ');
  return parsedMessage;
};

export const getInitials = (name: string) => {
  return name
    ?.split(' ')
    ?.map((word) => word.charAt(0).toUpperCase())
    ?.join('');
};

export const deepTrim = (obj: unknown): unknown => {
  if (typeof obj === 'string') {
    return obj.trim();
  } else if (Array.isArray(obj)) {
    return obj.map(deepTrim);
  } else if (typeof obj === 'object' && obj !== null) {
    return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, deepTrim(value)]));
  }
  return obj;
};

export const linkify = (input: string) => {
  const combinedRegex =
    /(\bhttps?:\/\/[^\s<\]]+|\bwww\.[^\s<\]]+|\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\b[a-zA-Z0-9-]+\.(com|net|org|co\.in|in|io|dev|ai|app|me|xyz|info|edu|gov|us|uk)\b)/gi;

  return input.replace(combinedRegex, (match) => {
    if (/^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(match)) {
      return `<a href="mailto:${match}" class="text-blue-500 underline">${match}</a>`;
    }

    if (/^https?:\/\//.test(match)) {
      return `<a href="${match}" class="text-blue-500 underline" target="_blank" rel="noopener noreferrer">${match}</a>`;
    }

    if (/^www\./.test(match)) {
      return `<a href="http://${match}" class="text-blue-500 underline" target="_blank" rel="noopener noreferrer">${match}</a>`;
    }

    return `<a href="http://${match}" class="text-blue-500 underline" target="_blank" rel="noopener noreferrer">${match}</a>`;
  });
};
