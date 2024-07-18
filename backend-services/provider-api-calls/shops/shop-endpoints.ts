import { IApiCallParams } from "@/lib/callAPi"
import { BACKEND_URL } from "@/utils/types/constants/backend-constants"

export const PROVIDER_SHOP_END_POINT_PREFIX = BACKEND_URL + 'provider/shops/'

 

export const  getCashierApiCallsForShop = (shopId: string, data?: any): {
    list: IApiCallParams,
    add: IApiCallParams
} => {
    return {
        list: {
            endpoint:  PROVIDER_SHOP_END_POINT_PREFIX + shopId + '/cashiers',
            method: 'GET',
        }, 
        add: { 
            endpoint:  PROVIDER_SHOP_END_POINT_PREFIX + shopId + '/add-cashier',
            method: 'POST',
            body: data
        },   
    }
}
 