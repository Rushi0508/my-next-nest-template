import { FileExtension, FileContentType } from '@/types/files.type';

export const fileExtensions = new Map<FileExtension, FileContentType>([
  ['txt', 'text/plain'],
  ['md', 'text/markdown'],
  ['json', 'application/json'],
  ['csv', 'text/csv'],
  ['png', 'image/png'],
  ['jpg', 'image/jpeg'],
  ['jpeg', 'image/jpeg'],
  ['webp', 'image/webp'],
  ['gif', 'image/gif'],
  ['svg', 'image/svg+xml'],
  ['pdf', 'application/pdf'],
  ['doc', 'application/msword'],
  ['docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  ['xls', 'application/vnd.ms-excel'],
  ['xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  ['ppt', 'application/vnd.ms-powerpoint'],
  ['pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
  ['mp3', 'audio/mpeg'],
  ['mp4', 'video/mp4'],
  ['mov', 'video/quicktime'],
  ['avi', 'video/x-msvideo'],
  ['mkv', 'video/x-matroska'],
  ['zip', 'application/zip'],
  ['rar', 'application/vnd.rar'],
  ['tar', 'application/x-tar'],
  ['gz', 'application/gzip'],
]);

export const getContentType = (extension: FileExtension) => {
  return fileExtensions.get(extension) || 'text/plain';
};

export const getExtension = (contentType: FileContentType) => {
  return Array.from(fileExtensions.entries()).find(([_, value]) => value === contentType)?.[0] || 'txt';
};

export const saveFile = (content: string, name: string, extension: FileExtension) => {
  const blob = new Blob([content], { type: getContentType(extension) });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${name}.${extension}`;
  link.click();
  window.URL.revokeObjectURL(url);
  if (link.parentNode) {
    link.parentNode.removeChild(link);
  }
};

export const readFile = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = () => {
      reject(reader.error);
    };
    reader.readAsDataURL(file);
  });
};

export const exportAsJSON = (data: any, name: string) => {
  const json = JSON.stringify(data, null, 2);
  saveFile(json, name, 'json');
};

export const jsonToCsv = (json: any[]) => {
  const replacer = (_: any, value: any) => (value === null ? '' : value);
  const header = Object.keys(json[0]);
  const csv = json.map((row: any) => header.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(','));
  csv.unshift(header.join(','));
  return csv.join('\r\n');
};

export const exportAsCSV = (data: any[], name: string) => {
  const csv = jsonToCsv(data);
  saveFile(csv, name, 'csv');
};
