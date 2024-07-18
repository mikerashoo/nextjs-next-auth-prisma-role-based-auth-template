  
import { ICallAPiResponse, callApi, callApiFromParams } from "@/lib/callAPi";
import { PROVIDER_SHOP_END_POINTS } from "."; 
import { IShopCreateSchema, IShopUpdateSchema } from "@/utils/shared/schemas/provider/shop-information-schema";
import { IShopDetailContext } from "@/contexts/shop-contexts/ShopDetailContext"; 
import { ICashierReport } from "@/utils/shared/shared-types/gameModels";
import { getCashierApiCallsForShop } from "./shop-endpoints";
import { ICashierRegisterSchema } from "@/utils/shared/schemas/userSchemas"; 
import { IUser } from "@/utils/shared/shared-types/userModels";
import { IProviderCommonQuerySchema, ITicketReportFilterSchema } from "@/utils/shared/schemas/reportSchema";
import { IShopWithDetail } from "@/utils/shared/shared-types/providerAndShop";

const fetchShops = async (filterQuery?: IProviderCommonQuerySchema): Promise<ICallAPiResponse<IShopWithDetail[]>> => {
    try {
       const listData =  await callApi(PROVIDER_SHOP_END_POINTS.list(filterQuery), 'GET', null);
       console.log("List Data" + new Date().getTime(), listData)
       return listData;
 
    } catch (error) {
        console.error("Backend get fetchShopss error", error);
        throw error;
    }
};

const addShop = async (data: IShopCreateSchema): Promise<ICallAPiResponse<IShopWithDetail>> => {
    try {
       return await callApi(PROVIDER_SHOP_END_POINTS.add, 'POST', data);
 
    } catch (error) {
        console.error("Backend get fetchShopss error", error);
        throw error;
    }
};


const deleteShop = async (shopId: string): Promise<ICallAPiResponse<boolean>> => {
    try {
       return await callApi(PROVIDER_SHOP_END_POINTS.delete(shopId), 'DELETE', null);
 
    } catch (error) {
        console.error("Backend get fetchShopss error", error);
        throw error;
    }
};




const getShopDetail = async (shopIdentifier: string): Promise<ICallAPiResponse<IShopWithDetail>> => {
    try {
       return await callApi(PROVIDER_SHOP_END_POINTS.detail(shopIdentifier), 'GET', null);
 
    } catch (error) {
        console.error("Backend get fetchShopss error", error);
        throw error;
    }
}; 

const getShopReport = async (data: ITicketReportFilterSchema): Promise<ICallAPiResponse<ICashierReport>> => {
    try {
       return await callApi(PROVIDER_SHOP_END_POINTS.shopReport, 'POST', data);
 
    } catch (error) {
        console.error("Backend get fetchShopss error", error);
        throw error;
    }
};


const updateShop = async (shopId: string, data: IShopUpdateSchema): Promise<ICallAPiResponse<IShopWithDetail>> => {
    try {
       return await callApi(PROVIDER_SHOP_END_POINTS.update(shopId), 'POST', data);
 
    } catch (error) {
        console.error("Backend get fetchShopss error", error);
        throw error;
    }
};
 



const getShopCashiers = async ( shopId: string): Promise<ICallAPiResponse<IUser[]>> => {
    try {
        const listApiCall = getCashierApiCallsForShop(shopId).list;
       return await callApiFromParams(listApiCall);
 
    } catch (error) {
        console.error("Backend get fetchShopss error", error);
        throw error;
    }
};

const addCashier = async (shopId: string, data: ICashierRegisterSchema): Promise<ICallAPiResponse<IUser>> => {
    try {
        const addApiCall = getCashierApiCallsForShop(shopId, data).add;
        return await callApiFromParams(addApiCall); 
 
    } catch (error) {
        console.error("Backend get Adding Cashier error", error);
        throw error;
    }
};
 


export const shopInformationApiService = {
    list: fetchShops,
    add: addShop,
    update: updateShop,
    detail: getShopDetail,
    report: getShopReport,
    delete: deleteShop,
    cashiers: getShopCashiers,
    addCashier,
}