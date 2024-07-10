  
import { ICallAPiResponse, callApi, callApiFromParams } from "@/lib/callAPi";  
import { ICashierRegisterSchema, ICashierUpdateSchema, IChangePasswordSchema } from "@/utils/shared/schemas/userSchemas"; 
import { IDBBranch, IDBCashier } from "@/utils/shared/shared-types/prisma-models"; 
import { getCashierApiCalls } from "./cashier-endpoints";



 

const deleteCashier = async ( cashierId: string): Promise<ICallAPiResponse<boolean>> => {
    try {
       return await callApiFromParams(getCashierApiCalls(cashierId).delete);
 
    } catch (error) {
        console.error("Backend get fetchBranchess error", error);
        throw error;
    }
};

const changeStatus = async ( cashierId: string): Promise<ICallAPiResponse<IDBCashier>> => {
    try {
       return await callApiFromParams(getCashierApiCalls(cashierId).changeStatus);
 
 
    } catch (error) {
        console.error("Backend get fetchBranchess error", error);
        throw error;
    }
};


const changePassword = async ( cashierId: string, data: IChangePasswordSchema): Promise<ICallAPiResponse<boolean>> => {

    try {
       return await callApiFromParams(getCashierApiCalls(cashierId, data).changePassword);
 
 
    } catch (error) {
        console.error("Backend get fetchBranchess error", error);
        throw error;
    }
};


 

const update = async (cashierId: string, data: ICashierUpdateSchema): Promise<ICallAPiResponse<IDBCashier>> => {
    try {
       return await callApiFromParams(getCashierApiCalls(cashierId, data).update);
 
 
    } catch (error) {
        console.error("Backend get fetchBranchess error", error);
        throw error;
    }
};
 

 


export const cashierApiCalls = { 
   
    update, 
    delete: deleteCashier,
    changeStatus,
    changePassword,
}