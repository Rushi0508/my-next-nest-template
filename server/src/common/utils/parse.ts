import { jsonrepair } from 'jsonrepair';

export const safeParseJson = (input: string) => {
  try {
    return JSON.parse(input);
  } catch {
    try {
      const repairedJson = jsonrepair(input);
      return JSON.parse(repairedJson);
    } catch {
      throw new Error(`Invalid JSON: ${input}`);
    }
  }
};
