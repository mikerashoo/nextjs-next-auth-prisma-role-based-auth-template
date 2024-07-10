 
import { ICallAPiResponse, callApi, callNoAuthApi } from "@/lib/callAPi";
import { BACKEND_AUTH_URL } from "@/utils/types/constants/backend-constants";  
import { JWT } from "next-auth/jwt";

export const getUserFromBackend = async (userName: string, password: string) => {
    try {
        const loginData = {
            userName,
            password
        }; 
        const res = await fetch(BACKEND_AUTH_URL + 'provider-admin-login', {
            method: 'POST',
            body: JSON.stringify(loginData),
            headers: { "Content-Type": "application/json" }
        });

        console.log("Response of getUserFromDb", res);
        
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
            return user;
        } else {
            // Check if the response contains an error message
            if (user && user.error) {
                throw new Error(user.error);
            } else {
                throw new Error(res.statusText);
            }
        }
    } catch (error) {
        console.error("Backend get userFromBackend error", error);
        throw error;
    }
};


export const getUserRefreshToken = async (token: JWT) => {
    try {
         

        const res = await fetch(BACKEND_AUTH_URL + 'refresh-token', {
            method: 'POST',
            body: JSON.stringify({
                refreshToken: token.refreshToken
            }),
            headers: { "Content-Type": "application/json" }
        });

        console.log("Response of getUserFromDb", res);
        
        const refreshedTokens = await res.json()

        if (!res.ok) {
          throw refreshedTokens
        }
    
        return {
          ...token,
          accessToken: refreshedTokens.access_token,
          accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
          refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
        }
    } catch (error) {
        console.log(error)

    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
    }
};



export const validateRefreshToken = async (refreshToken: string): Promise<ICallAPiResponse<any>> => {
    try {
       return await callApi(BACKEND_AUTH_URL + 'validate-token', 'POST', { refreshToken});
 
    } catch (error) {
        console.error("Backend get fetchBranchess error", error);
        throw error;
    }
};
 
