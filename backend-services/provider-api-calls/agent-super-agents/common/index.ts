import { IApiCallParams } from "@/lib/callAPi"
import { PROVIDER_AGENTS_END_POINT_PREFIX, PROVIDER_SUPER_AGENT_END_POINT_PREFIX } from "@/utils/types/constants/backend-constants"

 


export const  providerCommonAgentEndPoints = ({superAgentId, data, params} : {superAgentId?: string, data?: any, params?: string}): {
    list: IApiCallParams,
    commonList: IApiCallParams,
    add: IApiCallParams,
    update: IApiCallParams,
    changePassword: IApiCallParams,
    delete: IApiCallParams,
    info: IApiCallParams,
    report: IApiCallParams,
    changeStatus: IApiCallParams,
} => {
    return {
        list: {
            endpoint:  PROVIDER_AGENTS_END_POINT_PREFIX + 'list',
            method: 'GET',
        }, 
        commonList: {
            endpoint:  PROVIDER_AGENTS_END_POINT_PREFIX + 'both',
            method: 'GET',
        }, 
        add: { 
            endpoint: PROVIDER_AGENTS_END_POINT_PREFIX + 'add',
            method: 'POST',
            body: data
        },   
        info: { 
            endpoint: PROVIDER_AGENTS_END_POINT_PREFIX + superAgentId + '/info',
            method: 'GET', 
        },  
        report: { 
            endpoint: PROVIDER_AGENTS_END_POINT_PREFIX + superAgentId + '/report?' + params,
            method: 'Get',  

        },  
        update: { 
            endpoint: PROVIDER_AGENTS_END_POINT_PREFIX + superAgentId + '/update',
            method: 'POST',
            body: data
        },   
        changePassword: { 
            endpoint: PROVIDER_AGENTS_END_POINT_PREFIX + superAgentId + '/change-password',
            method: 'POST',
            body: data
        },   
        delete: { 
            endpoint: PROVIDER_AGENTS_END_POINT_PREFIX + superAgentId + '/delete',
            method: 'DELETE', 
        },   

        changeStatus: { 
            endpoint: PROVIDER_AGENTS_END_POINT_PREFIX + superAgentId + '/change-status',
            method: 'GET', 
        },       
    }
}
 