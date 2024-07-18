import { IApiCallParams } from "@/lib/callAPi"
import { BACKEND_URL } from "@/utils/types/constants/backend-constants"

export const PROVIDER_CASHIERS_END_POINT_PREFIX = BACKEND_URL + 'provider/cashiers/'


export const  getCashierApiCalls = (cashierId: string, data?: any): {
    update: IApiCallParams,
    delete: IApiCallParams,
    changeStatus: IApiCallParams,
    changePassword: IApiCallParams,
} => {
    return {
        update: {
            endpoint:  PROVIDER_CASHIERS_END_POINT_PREFIX + cashierId + '/update',
            method: 'POST',
            body: data
        }, 
        changePassword: {
            endpoint:  PROVIDER_CASHIERS_END_POINT_PREFIX + cashierId + '/change-password',
            method: 'POST',
            body: data
        }, 
        changeStatus: { 
            endpoint:  PROVIDER_CASHIERS_END_POINT_PREFIX + cashierId + '/change-status',
            method: 'GET', 
        },   
        delete: { 
            endpoint:  PROVIDER_CASHIERS_END_POINT_PREFIX + cashierId + '/delete',
            method: 'DELETE', 
        },   
    }
} 