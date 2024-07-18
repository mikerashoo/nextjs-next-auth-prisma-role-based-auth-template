
export interface ICashReport {
  totalMoneyCollected: number;
  totalMoneyPaid: number;
  totalMoneyToBePaid: number;
  remainingCash: number; 
  netCash: number; 

}


export interface ITicketReport {
totalCount: number;
cancelledCount: number; 
activeCount: number; 
paidCount: number; 
winnerCount: number; 
loserCount: number; 
}

export interface ICommonReport {
  cash: ICashReport,
  ticket: ITicketReport

}



export interface IGeneralStatics {
  activeShopsCount: number,
  inactiveShopsCount: number, 

}


export interface IBasicCashierInfo {
  fullName: string,
  shopName: string,
  totalCollected: number, 

}


export interface IBasicShopInfo {
  name: string,
  agentName: string,
  totalCollected: number, 

}
