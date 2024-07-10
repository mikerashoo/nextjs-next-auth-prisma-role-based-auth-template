 
import { UserRole } from "@/lib/enums";
import { FiChevronDown, FiTrendingUp } from "react-icons/fi";

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
            route: '/admin/branches',
            label: "Branches",
            icon: FiChevronDown

        }
    ]
};
