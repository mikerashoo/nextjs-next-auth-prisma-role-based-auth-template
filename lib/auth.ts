// auth.ts 
import { getSession } from 'next-auth/react';

export async function getAccessToken() {
  

  const session = await getSession();
  if (!session?.accessToken) {
    throw new Error('Access token not found in session');
  }
  return session.accessToken;
}
 