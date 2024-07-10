import { UserRole, ActiveStatus, KenoGameStatus, TicketStatus } from "@/lib/enums";

export interface IUser {
    id: string;
    fullName: string;
    email?: string;
    userName?: string;
    phoneNumber: string;
    password: string;
    role: UserRole;
    status: ActiveStatus;
    createdAt: string;
    updatedAt: string; 
  }
  