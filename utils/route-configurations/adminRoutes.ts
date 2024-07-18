 
 
import { FiChevronDown, FiTrendingUp } from "react-icons/fi";
import { UserRole } from "../shared/shared-types/prisma-enums";

export const adminProviderRoute = {
    route: '/admin/providers',
    label: "Providers",
    icon: FiTrendingUp
}
export const adminRoleRoutes = {
    role: UserRole.ADMIN,
    route: '/admin',
    subRoutes: [
        adminProviderRoute,
        {
            route: '/admin/shops',
            label: "Shops",
            icon: FiChevronDown

        }
    ]
};
