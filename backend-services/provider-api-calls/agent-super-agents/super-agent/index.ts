import { IApiCallParams } from "@/lib/callAPi"
import { BACKEND_URL, PROVIDER_SUPER_AGENT_END_POINT_PREFIX } from "@/utils/types/constants/backend-constants"




export const  providerSuperAgentEndPoints = ({superAgentId, data, params} : {superAgentId?: string, data?: any, params?: string}): {
    list: IApiCallParams,
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
            endpoint:  PROVIDER_SUPER_AGENT_END_POINT_PREFIX + 'list',
            method: 'GET',
        }, 
        add: { 
            endpoint: PROVIDER_SUPER_AGENT_END_POINT_PREFIX + 'add',
            method: 'POST',
            body: data
        },   
        info: { 
            endpoint: PROVIDER_SUPER_AGENT_END_POINT_PREFIX + superAgentId + '/info',
            method: 'GET', 
        },  
        report: { 
            endpoint: PROVIDER_SUPER_AGENT_END_POINT_PREFIX + superAgentId + '/report?' + params,
            method: 'Get',  

        },  
        update: { 
            endpoint: PROVIDER_SUPER_AGENT_END_POINT_PREFIX + superAgentId + '/update',
            method: 'POST',
            body: data
        },   
        changePassword: { 
            endpoint: PROVIDER_SUPER_AGENT_END_POINT_PREFIX + superAgentId + '/change-password',
            method: 'POST',
            body: data
        },   
        delete: { 
            endpoint: PROVIDER_SUPER_AGENT_END_POINT_PREFIX + superAgentId + '/delete',
            method: 'DELETE', 
        },   

        changeStatus: { 
            endpoint: PROVIDER_SUPER_AGENT_END_POINT_PREFIX + superAgentId + '/change-status',
            method: 'GET', 
        },       
    }
}
 