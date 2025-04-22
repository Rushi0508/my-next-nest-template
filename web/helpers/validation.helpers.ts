import { decodeJwt, JWTPayload } from 'jose';

export const verifyToken = async (token: string) => {
  try {
    const payload = decodeJwt(token);
    if (payload?.exp && Date.now() >= payload.exp * 1000) {
      return null;
    }
    return payload as JWTPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
};
