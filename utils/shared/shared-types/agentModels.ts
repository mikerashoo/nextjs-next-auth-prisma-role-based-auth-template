 
import { UserRole } from "./prisma-enums";
import { IUser } from "./userModels";

export interface ISuperAgentInfo extends IUser {
    agentCount: number,
    shopCount: number,
  }

  export interface IUserBasicInformationForRelation {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    role: UserRole
  }



  export interface IAgentWithSuperAgent extends  IUserBasicInformationForRelation{
    superAgent?: IUserBasicInformationForRelation
  }

