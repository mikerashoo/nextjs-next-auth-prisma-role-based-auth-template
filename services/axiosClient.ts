// import { createAxiosClient } from "./createAxiosClient";
// import { useAuthStore } from "../src/stores/authStore";

// const REFRESH_TOKEN_URL = 'http://localhost:5000/api/v1/auth/refreshToken'
// const BASE_URL = 'http://localhost:5000/api/v1/'

// function getCurrentAccessToken() {
//     // this is how you access the zustand store outside of React.
//     return useAuthStore.getState().accessToken
// }

// function getCurrentRefreshToken() {
//     // this is how you access the zustand store outside of React.
//     return useAuthStore.getState().refreshToken
// }


// function setRefreshedTokens(tokens){
//     console.log('set tokens...')
// }

// async function logout(){
//     console.log('logout...')
// }

// export const client = createAxiosClient({
//     options: {
//         baseURL: BASE_URL,
//         timeout: 300000,
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     },
//     getCurrentAccessToken,
//     getCurrentRefreshToken,
//     refreshTokenUrl: REFRESH_TOKEN_URL,
//     logout,
//     setRefreshedTokens
// })