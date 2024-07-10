import { IApiCallParams } from "@/lib/callAPi"
import { BACKEND_URL } from "@/utils/types/constants/backend-constants"

export const PROVIDER_BRANCH_END_POINT_PREFIX = BACKEND_URL + 'provider/branches/'

 

export const  getCashierApiCallsForBranch = (branchId: string, data?: any): {
    list: IApiCallParams,
    add: IApiCallParams
} => {
    return {
        list: {
            endpoint:  PROVIDER_BRANCH_END_POINT_PREFIX + branchId + '/cashiers',
            method: 'GET',
        }, 
        add: { 
            endpoint:  PROVIDER_BRANCH_END_POINT_PREFIX + branchId + '/add-cashier',
            method: 'POST',
            body: data
        },   
    }
}
 