export interface RequestUser {
  id: string;
  email: string;
  name: string;
  image: string;
  sub: string;
  timezone?: string | null;
}
