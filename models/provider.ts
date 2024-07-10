import { ActiveStatus } from "@/lib/enums";
import { User } from "@prisma/client";
import { IUser } from "./user";

export interface IProvider {
    id: string;
    name: string;
    identifier: string;
    address: string;
    status: ActiveStatus;
    createdAt: string;
    updatedAt: string;
    admins: IUser[];
  }