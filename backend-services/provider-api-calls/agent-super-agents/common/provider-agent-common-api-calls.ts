  
import { ICallAPiResponse, callApi, callApiFromParams } from "@/lib/callAPi";  
import { ICashierRegisterSchema, ICashierUpdateSchema, IChangePasswordSchema } from "@/utils/shared/schemas/userSchemas";   
import { IUser } from "@/utils/shared/shared-types/userModels"; 
import { IAgentRegistrationSchema, IUserUpdateSchema } from "@/utils/shared/schemas/userSchemas";
import { IAgentWithSuperAgent, ISuperAgentInfo } from "@/utils/shared/shared-types/agentModels";
import { ICashierReport } from "@/utils/shared/shared-types/gameModels"; 
import { ICashReport, ICommonReport } from "@/utils/shared/shared-types/reportModels";
import { providerCommonAgentEndPoints } from ".";



 

const list = async (): Promise<ICallAPiResponse<IUser[]>> => {
    try {
       return await callApiFromParams(providerCommonAgentEndPoints({}).list);
 
    } catch (error) {
        console.error("Backend get  error", error);
        throw error;
    }
};


const commonList = async (): Promise<ICallAPiResponse<IAgentWithSuperAgent[]>> => {
    try {
       return await callApiFromParams(providerCommonAgentEndPoints({}).commonList);
 
    } catch (error) {
        console.error("Backend get  error", error);
        throw error;
    }
};

const add = async ( data: IAgentRegistrationSchema): Promise<ICallAPiResponse<IUser>> => {
    try {
       return await callApiFromParams(providerCommonAgentEndPoints({data}).add);
        
 
 
    } catch (error) {
        console.error("Backend get  error", error);
        throw error;
    }
};

const info = async (agentId: string): Promise<ICallAPiResponse<ISuperAgentInfo>> => {
    try {
       return await callApiFromParams(providerCommonAgentEndPoints({superAgentId: agentId}).info);
        
 
 
    } catch (error) {
        console.error("Backend get  error", error);
        throw error;
    }
};


const report = async (agentId: string, params: string): Promise<ICallAPiResponse<ICommonReport>> => {
    try {
       return await callApiFromParams(providerCommonAgentEndPoints({superAgentId: agentId, params}).report);
        
 
 
    } catch (error) {
        console.error("Backend get  error", error);
        throw error;
    }
};

const update = async (agentId: string, data: IUserUpdateSchema): Promise<ICallAPiResponse<IUser>> => {
    try {
       return await callApiFromParams(providerCommonAgentEndPoints({superAgentId:agentId, data}).update);
        
 
 
    } catch (error) {
        console.error("Backend get  error", error);
        throw error;
    }
};


const changePassword = async (agentId: string, data: IChangePasswordSchema): Promise<ICallAPiResponse<IUser>> => {
    try {
       return await callApiFromParams(providerCommonAgentEndPoints({superAgentId:agentId, data}).changePassword);
        
 
 
    } catch (error) {
        console.error("Backend get  error", error);
        throw error;
    }
};

const deleteSuperAgent = async ( superAgentId: string): Promise<ICallAPiResponse<boolean>> => {
    try {
       return await callApiFromParams(providerCommonAgentEndPoints({superAgentId}).delete);
        
 
 
    } catch (error) {
        console.error("Backend get  error", error);
        throw error;
    }
};


const changeStatus = async ( superAgentId: string): Promise<ICallAPiResponse<IUser>> => {
    try {
       return await callApiFromParams(providerCommonAgentEndPoints({superAgentId}).changeStatus);
        
 
 
    } catch (error) {
        console.error("Backend get  error", error);
        throw error;
    }
}; 

 


export const providerCommonAgentApiCalls = { 
   list,
   commonList,
   add,
   info,
   report,
   update,
   changeStatus,
   changePassword,
   delete: deleteSuperAgent, 
}