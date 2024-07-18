  
import { ICallAPiResponse, callApi, callApiFromParams } from "@/lib/callAPi";
import { PROVIDER_BRANCH_END_POINTS } from "."; 
import { IBranchCreateSchema, IBranchUpdateSchema } from "@/utils/shared/schemas/provider/branch-information-schema";
import { IBranchDetailContext } from "@/contexts/branch-contexts/BranchDetailContext"; 
import { ICashierReport } from "@/utils/shared/shared-types/gameModels";
import { getCashierApiCallsForBranch } from "./branch-endpoints";
import { ICashierRegisterSchema } from "@/utils/shared/schemas/userSchemas"; 
import { IUser } from "@/utils/shared/shared-types/userModels";
import { IProviderCommonQuerySchema, ITicketReportFilterSchema } from "@/utils/shared/schemas/reportSchema";
import { IBranchWithDetail } from "@/utils/shared/shared-types/providerAndBranch";

const fetchBranches = async (filterQuery?: IProviderCommonQuerySchema): Promise<ICallAPiResponse<IBranchWithDetail[]>> => {
    try {
       const listData =  await callApi(PROVIDER_BRANCH_END_POINTS.list(filterQuery), 'GET', null);
       console.log("List Data" + new Date().getTime(), listData)
       return listData;
 
    } catch (error) {
        console.error("Backend get fetchBranchess error", error);
        throw error;
    }
};

const addBranch = async (data: IBranchCreateSchema): Promise<ICallAPiResponse<IBranchWithDetail>> => {
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


const updateBranch = async (branchId: string, data: IBranchUpdateSchema): Promise<ICallAPiResponse<IBranchWithDetail>> => {
    try {
       return await callApi(PROVIDER_BRANCH_END_POINTS.update(branchId), 'POST', data);
 
    } catch (error) {
        console.error("Backend get fetchBranchess error", error);
        throw error;
    }
};
 



const getBranchCashiers = async ( branchId: string): Promise<ICallAPiResponse<IUser[]>> => {
    try {
        const listApiCall = getCashierApiCallsForBranch(branchId).list;
       return await callApiFromParams(listApiCall);
 
    } catch (error) {
        console.error("Backend get fetchBranchess error", error);
        throw error;
    }
};

const addCashier = async (branchId: string, data: ICashierRegisterSchema): Promise<ICallAPiResponse<IUser>> => {
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