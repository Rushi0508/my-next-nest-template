import { ApiClient } from '@/lib/api-client';
import { LoginResponse } from '@/types/auth.type';

export class AuthService {
  static async handleGoogleAuth(idToken: string) {
    return await ApiClient.post<LoginResponse>('/api/auth/google', { idToken });
  }
}
