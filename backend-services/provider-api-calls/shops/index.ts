import { BACKEND_URL } from "@/utils/types/constants/backend-constants"; 
import { users } from "./users";
import { IProviderCommonQuerySchema } from "@/utils/shared/schemas/reportSchema";
import { convertSchemaToUrlParams } from "@/backend-services/api-helpers";
 

export const PROVIDER_SHOP_END_POINT_PREFIX = BACKEND_URL + 'provider/shops/'

export const PROVIDER_SHOP_END_POINTS = {
    list: (filterQuery?: IProviderCommonQuerySchema) => PROVIDER_SHOP_END_POINT_PREFIX + 'list?' + convertSchemaToUrlParams(filterQuery),
    add: PROVIDER_SHOP_END_POINT_PREFIX + 'add', 
    shopReport: PROVIDER_SHOP_END_POINT_PREFIX + 'shop-report', 
    update: (shopId: string) => PROVIDER_SHOP_END_POINT_PREFIX + shopId + '/update',
    detail: (shopId: string) => PROVIDER_SHOP_END_POINT_PREFIX + shopId + '/detail',
    delete: (shopId: string) => PROVIDER_SHOP_END_POINT_PREFIX + shopId + '/delete', 
    getCashiers: (shopId: string) => PROVIDER_SHOP_END_POINT_PREFIX + shopId + '/cashiers',
    addCashier: (shopId: string) => PROVIDER_SHOP_END_POINT_PREFIX + shopId + '/add-cashier', 
}
export const ADMIN_BACKEND_DATA = {
    users, 
}