'use server';
import { cookies } from 'next/headers';

export const getCookie = async (name: string) => {
  const cookie = (await cookies()).get(name);
  return cookie?.value;
};

export const setCookie = async (name: string, value: string) => {
  (await cookies()).set(name, value);
};

export const deleteCookie = async (name: string) => {
  (await cookies()).delete(name);
};
