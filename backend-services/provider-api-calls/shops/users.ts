 
import { callApi } from "@/lib/callAPi";
import { ADMIN_URLS, BACKEND_AUTH_URL } from "@/utils/types/constants/backend-constants";  
const getUsersFromBackend = async () => {
    try {
        const userData = await callApi(ADMIN_URLS.users, 'GET', null);

        
        if(userData.data){
            return userData.data;
        }
       else {
            throw new Error('No users found');
        }
    } catch (error) {
        console.error("Backend get getUsersFromBackend error", error);
        throw error;
    }
};


export const users = {
    getAll: getUsersFromBackend
}