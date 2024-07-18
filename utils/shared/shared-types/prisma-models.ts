// Auto-generated Prisma models

import { UserRole,ActiveStatus,GameType,GameStatus,TicketStatus } from './prisma-enums';

export interface IDBUser {
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
  providerId?: string;
  //: Agent;
  superAgentId?: string;
  agentProviderId?: string;
  //: cashier;
  cashierShopId?: string;
}

export interface IDBUserWithRelations {
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
  refreshTokens: IDBRefreshToken[];
  //: IDBProvider;
  providerId?: string;
  provider?: IDBProvider;
  //: Agent;
  superAgentId?: string;
  superAgent?: IDBUser;
  agents: IDBUser[];
  agentProviderId?: string;
  agentProvider?: IDBProvider;
  agentShops: IDBShop[];
  //: cashier;
  cashierShopId?: string;
  cashierShop?: IDBShop;
  tickets: IDBTicket[];
  cancelledTickets: IDBTicket[];
  ticketPayments: IDBTicketPayment[];
}

export interface IDBRefreshToken {
  id: string;
  hashedToken: string;
  userId?: string;
  revoked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDBRefreshTokenWithRelations {
  id: string;
  hashedToken: string;
  userId?: string;
  User?: IDBUser;
  revoked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDBProvider {
  id: string;
  name: string;
  identifier: string;
  address: string;
  status: ActiveStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  deleted: boolean;
  //: Relations;
}

export interface IDBProviderWithRelations {
  id: string;
  name: string;
  identifier: string;
  address: string;
  status: ActiveStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  deleted: boolean;
  shops: IDBShop[];
  //: Relations;
  admins: IDBUser[];
  agents: IDBUser[];
}

export interface IDBShop {
  id: string;
  identifier: string;
  name: string;
  address: string;
  status: ActiveStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  deleted: boolean;
  providerId: string;
  agentId?: string;
}

export interface IDBShopWithRelations {
  id: string;
  identifier: string;
  name: string;
  address: string;
  status: ActiveStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  deleted: boolean;
  providerId: string;
  provider: IDBProvider;
  agentId?: string;
  agent?: IDBUser;
  cashiers: IDBUser[];
  games: IDBGame[];
}

export interface IDBGame {
  id: string;
  uniqueId: string;
  shopId: string;
  gameType: GameType;
  startAt: Date;
  endAt: Date;
  status: GameStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDBGameWithRelations {
  id: string;
  uniqueId: string;
  shopId: string;
  gameType: GameType;
  startAt: Date;
  endAt: Date;
  status: GameStatus;
  createdAt: Date;
  updatedAt: Date;
  shop: IDBShop;
  tickets: IDBTicket[];
  keno?: IDBKenoGame;
  dogRacing?: IDBDogRacingGame;
}

export interface IDBTicket {
  id: string;
  uniqueId: string;
  totalBetAmount?: number;
  possibleWinAmount?: number;
  winAmount?: number;
  status: TicketStatus;
  createdAt: Date;
  gameId: string;
  cashierId: string;
  cancelledAt?: Date;
  cancelledCashierId?: string;
}

export interface IDBTicketWithRelations {
  id: string;
  uniqueId: string;
  totalBetAmount?: number;
  possibleWinAmount?: number;
  winAmount?: number;
  status: TicketStatus;
  createdAt: Date;
  gameId: string;
  game: IDBGame;
  cashierId: string;
  cashier: IDBUser;
  cancelledAt?: Date;
  cancelledCashierId?: string;
  cancelledBy?: IDBUser;
  kenoTicket?: IDBKenoTicket;
  dogRacingTicket?: IDBDogRacingTicket;
  payment?: IDBTicketPayment;
}

export interface IDBKenoGame {
  id: string;
  gameId: string;
  winningNumbers: number[];
  ticketWillBeDisabledAt: Date;
  winningNumberWillBeShowedAt: Date;
}

export interface IDBKenoGameWithRelations {
  id: string;
  gameId: string;
  winningNumbers: number[];
  ticketWillBeDisabledAt: Date;
  winningNumberWillBeShowedAt: Date;
  game: IDBGame;
}

export interface IDBDogRacingGame {
  id: string;
  gameId: string;
  ticketWillBeDisabledAt: Date;
}

export interface IDBDogRacingGameWithRelations {
  id: string;
  gameId: string;
  ticketWillBeDisabledAt: Date;
  game: IDBGame;
}

export interface IDBKenoTicket {
  id: string;
  ticketId: string;
}

export interface IDBKenoTicketWithRelations {
  id: string;
  ticketId: string;
  selections: IDBTicketSelection[];
  ticket: IDBTicket;
}

export interface IDBDogRacingTicket {
  id: string;
  ticketId: string;
  //: Add;
}

export interface IDBDogRacingTicketWithRelations {
  id: string;
  ticketId: string;
  //: Add;
  ticket: IDBTicket;
}

export interface IDBTicketSelection {
  id: string;
  ticketId: string;
  selectedNumbers: number[];
  betAmount: number;
  possibleWinAmount?: number;
  winAmount?: number;
  status: TicketStatus;
}

export interface IDBTicketSelectionWithRelations {
  id: string;
  ticketId: string;
  selectedNumbers: number[];
  betAmount: number;
  possibleWinAmount?: number;
  winAmount?: number;
  status: TicketStatus;
  ticket: IDBKenoTicket;
}

export interface IDBTicketPayment {
  id: string;
  ticketId: string;
  cashierId: string;
  paidAmount?: number;
  createdAt: Date;
}

export interface IDBTicketPaymentWithRelations {
  id: string;
  ticketId: string;
  cashierId: string;
  paidAmount?: number;
  createdAt: Date;
  ticket: IDBTicket;
  cashier: IDBUser;
}

