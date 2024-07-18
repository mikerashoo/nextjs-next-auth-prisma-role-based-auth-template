 
 
import { UserRole } from "../shared/shared-types/prisma-enums";
import { adminRoleRoutes } from "./adminRoutes";

export const RouteRoles: Array<IRouteRole>= [
    adminRoleRoutes,
    {
        role: UserRole.PROVIDER_ADMIN,
        route: '/provider',
        subRoutes: [
            
        ]
    },
     {
        role: UserRole.CASHIER,
        route: '/shop',
        subRoutes: [
           
        ]
    },
     {
        role: UserRole.CASHIER,
        route: '/cashier',
        subRoutes: [
            
        ]
    }
]


export interface IRouteRole {
    role: UserRole,
    route: string,
    subRoutes: ISubRoute[]
}


export interface ISubRoute {
    label: string,
    route: string,
    icon: any
}