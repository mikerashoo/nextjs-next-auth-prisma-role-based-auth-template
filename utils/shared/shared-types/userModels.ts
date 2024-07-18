import { ActiveStatus, UserRole } from "./prisma-enums";
import {  IDBBranch, IDBProvider,  IDBUser } from "./prisma-models";
import { IBranch } from "./providerAndBranch";

export interface ICashier  {
    userName: string
}
 

export interface IUser extends Omit<IDBUser, 'password'> { 
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  userName?: string;
  phoneNumber: string;
  role: UserRole;
  status: ActiveStatus;
  createdAt: Date;
  deletedAt?: Date;
  deleted: boolean;
  updatedAt: Date; 
  provider?: IDBProvider; 
  agentProvider?: IDBProvider; 
  //: cashier; 
  cashierBranch?: IDBBranch; 
}


export interface IAccount {
  id       : string,
  userId : string,
  branchId : string,
  branch: IBranch
  profile: IUser
}

export interface ICashierLoginData extends IUser { 
  branch: IBranch;  
}

export interface IProviderAdminLoginData extends IUser { 
  provider: IDBProvider;  
}



export interface ILoginUser extends IUser { 
  accessToken:  string,
  refreshToken:  string,
  accessTokenExpires: number
}

export interface IProviderSiteLoginData extends ILoginUser  { 
  provider: IDBProvider;    
}

export interface ITokenData {
  accessToken:  string,
  refreshToken:  string,
  accessTokenExpires: number
}
 
export interface IRefreshToken {
    id          :  string;
    hashedToken :  string;
    userId      :  string;
    revoked     : Boolean;
    createdAt   : Date,
    updatedAt   : Date
  }


export type UserWithoutPassword = Omit<IDBUser, 'password'>; 