import { convertSchemaToUrlParams } from "@/backend-services/api-helpers";
import { IApiCallParams, ICallAPiResponse, callApiFromParams } from "@/lib/callAPi";
import { IBasicReportSchema } from "@/utils/shared/schemas/reportSchema";
import { ICommonReport } from "@/utils/shared/shared-types/reportModels"; 
import { PROVIDER_REPORT_END_POINT_PREFIX, PROVIDER_SUPER_AGENT_END_POINT_PREFIX } from "@/utils/types/constants/backend-constants";


 const  providerReportEndPoints = (params : IBasicReportSchema): {
    cash: IApiCallParams,
    ticket: IApiCallParams, 
} => {

    const query = convertSchemaToUrlParams(params);
    return {
        cash: {
            endpoint:  PROVIDER_REPORT_END_POINT_PREFIX + 'cash?' + query,
            method: 'GET',
        }, 
        ticket: { 
            endpoint:  PROVIDER_REPORT_END_POINT_PREFIX + 'ticket?' + query,
            
            method: 'GET', 
        },   
          
    }
}
 
const fetchCashReport = async ( params: IBasicReportSchema): Promise<ICallAPiResponse<ICommonReport>> => {
    try {
       return await callApiFromParams(providerReportEndPoints(params).cash);
        
 
 
    } catch (error) {
        console.error("Backend get  error", error);
        throw error;
    }
};




export const ProviderReportApiCalls = {
    cash: fetchCashReport
}