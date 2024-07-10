  
import { ICallAPiResponse, callApi, callApiFromParams } from "@/lib/callAPi";
import { PROVIDER_BRANCH_END_POINTS } from ".";
import { IDBBranch, IDBCashier } from "@/utils/shared/shared-types/prisma-models";
import { IBranchCreateSchema, IBranchUpdateSchema } from "@/utils/shared/schemas/provider/branch-information-schema";
import { IBranchDetailContext } from "@/contexts/branch-contexts/BranchDetailContext";
import { IBranchWithDetail } from "@/utils/shared/shared-types/providerAndBranch";
import { ITicketReportFilterSchema } from "@/utils/shared/schemas/provider/reportSchema";
import { ICashierReport } from "@/utils/shared/shared-types/gameModels";
import { getCashierApiCallsForBranch } from "./branch-endpoints";
import { ICashierRegisterSchema } from "@/utils/shared/schemas/userSchemas";

const fetchBranches = async (): Promise<ICallAPiResponse<IDBBranch[]>> => {
    try {
       const listData =  await callApi(PROVIDER_BRANCH_END_POINTS.list, 'GET', null);
       console.log("List Data" + new Date().getTime(), listData)
       return listData;
 
    } catch (error) {
        console.error("Backend get fetchBranchess error", error);
        throw error;
    }
};

const addBranch = async (data: IBranchCreateSchema): Promise<ICallAPiResponse<IDBBranch>> => {
    try {
       return await callApi(PROVIDER_BRANCH_END_POINTS.add, 'POST', data);
 
    } catch (error) {
        console.error("Backend get fetchBranchess error", error);
        throw error;
    }
};


const deleteBranch = async (branchId: string): Promise<ICallAPiResponse<boolean>> => {
    try {
       return await callApi(PROVIDER_BRANCH_END_POINTS.delete(branchId), 'DELETE', null);
 
    } catch (error) {
        console.error("Backend get fetchBranchess error", error);
        throw error;
    }
};




const getBranchDetail = async (branchIdentifier: string): Promise<ICallAPiResponse<IBranchWithDetail>> => {
    try {
       return await callApi(PROVIDER_BRANCH_END_POINTS.detail(branchIdentifier), 'GET', null);
 
    } catch (error) {
        console.error("Backend get fetchBranchess error", error);
        throw error;
    }
}; 

const getBranchReport = async (data: ITicketReportFilterSchema): Promise<ICallAPiResponse<ICashierReport>> => {
    try {
       return await callApi(PROVIDER_BRANCH_END_POINTS.branchReport, 'POST', data);
 
    } catch (error) {
        console.error("Backend get fetchBranchess error", error);
        throw error;
    }
};


const updateBranch = async (branchId: string, data: IBranchUpdateSchema): Promise<ICallAPiResponse<IDBBranch>> => {
    try {
       return await callApi(PROVIDER_BRANCH_END_POINTS.update(branchId), 'POST', data);
 
    } catch (error) {
        console.error("Backend get fetchBranchess error", error);
        throw error;
    }
};
 



const getBranchCashiers = async ( branchId: string): Promise<ICallAPiResponse<IDBCashier[]>> => {
    try {
        const listApiCall = getCashierApiCallsForBranch(branchId).list;
       return await callApiFromParams(listApiCall);
 
    } catch (error) {
        console.error("Backend get fetchBranchess error", error);
        throw error;
    }
};

const addCashier = async (branchId: string, data: ICashierRegisterSchema): Promise<ICallAPiResponse<IDBCashier>> => {
    try {
        const addApiCall = getCashierApiCallsForBranch(branchId, data).add;
        return await callApiFromParams(addApiCall); 
 
    } catch (error) {
        console.error("Backend get Adding Cashier error", error);
        throw error;
    }
};
 


export const branchInformationApiService = {
    list: fetchBranches,
    add: addBranch,
    update: updateBranch,
    detail: getBranchDetail,
    report: getBranchReport,
    delete: deleteBranch,
    cashiers: getBranchCashiers,
    addCashier,
}