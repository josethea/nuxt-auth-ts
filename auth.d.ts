declare module '#auth-utils' {
  interface User {
    id: number;
    name: string;
    email: string;
    avatar: string?;
    provider: string;
  }
}