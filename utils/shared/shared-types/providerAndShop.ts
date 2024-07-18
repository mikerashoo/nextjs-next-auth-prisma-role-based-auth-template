 
import { IDBShop } from "./prisma-models"; 
import { IAgentWithSuperAgent } from "./agentModels";   
import { ActiveStatus } from "./prisma-enums";

 

 
// providers
export interface IProvider {
    id       :string;
    name: string;
    identifier : string;
    address: string;
   
    status:        ActiveStatus;
    createdAt     :Date;
    updatedAt     :Date;         
  }
  
  // shop
  export interface IShop {
    id       :string;
    identifier : string;
    name: string; 
    address: string;
    providerId:      string
  
   
    status:       ActiveStatus;
    createdAt     :Date;
    updatedAt     :Date;         
   
  }

  export interface IShopWithDetail extends IDBShop { 
    agent: IAgentWithSuperAgent
   
  }