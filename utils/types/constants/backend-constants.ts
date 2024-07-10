export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL ??  "http://localhost:3001/" 

export const BACKEND_AUTH_URL = BACKEND_URL + 'auth/'
export const BACKEND_TEST_URL = BACKEND_URL + 'test'


// admin
export const BACKEND_ADMIN_URL = BACKEND_URL + 'admin/'
export const ADMIN_URLS = {
    users : BACKEND_ADMIN_URL + 'users',
    providers: {
        list:  BACKEND_ADMIN_URL + 'providers',
        detail:  BACKEND_ADMIN_URL + 'providers/detail',
        admins: {
            add: BACKEND_ADMIN_URL + 'providers/admins',
            list: BACKEND_ADMIN_URL + 'providers/admins',
        }
    }
    // providers : BACKEND_ADMIN_URL + 'providers',
}