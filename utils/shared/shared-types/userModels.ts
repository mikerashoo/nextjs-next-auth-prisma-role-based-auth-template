import { ActiveStatus, UserRole } from "./prisma-enums";
import {  IDBShop, IDBProvider,  IDBUser } from "./prisma-models"; 
import { IShop } from "./providerAndShop";
 

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
  cashierShop?: IDBShop; 
}


export interface IAccount {
  id       : string,
  userId : string,
  shopId : string,
  shop: IShop;
  profile: IUser
}

export interface ICashierLoginData extends IUser { 
  shop: IShop;  
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