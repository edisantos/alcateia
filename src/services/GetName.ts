
// hooks/useTokenName.ts
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"?: string;
}

export const GetName = (token: string | null): string | null => {
  if (!token) return null;
 
  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || null;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
