import { BACKEND_URL } from "@/utils/types/constants/backend-constants"; 
import { users } from "./users";
 

export const PROVIDER_BRANCH_END_POINT_PREFIX = BACKEND_URL + 'provider/branches/'

export const PROVIDER_BRANCH_END_POINTS = {
    list: PROVIDER_BRANCH_END_POINT_PREFIX + 'list',
    add: PROVIDER_BRANCH_END_POINT_PREFIX + 'add', 
    branchReport: PROVIDER_BRANCH_END_POINT_PREFIX + 'branch-report', 
    update: (branchId: string) => PROVIDER_BRANCH_END_POINT_PREFIX + branchId + '/update',
    detail: (branchId: string) => PROVIDER_BRANCH_END_POINT_PREFIX + branchId + '/detail',
    delete: (branchId: string) => PROVIDER_BRANCH_END_POINT_PREFIX + branchId + '/delete', 
    getCashiers: (branchId: string) => PROVIDER_BRANCH_END_POINT_PREFIX + branchId + '/cashiers',
    addCashier: (branchId: string) => PROVIDER_BRANCH_END_POINT_PREFIX + branchId + '/add-cashier', 
}
export const ADMIN_BACKEND_DATA = {
    users, 
}