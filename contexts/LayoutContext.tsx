// context/LayoutContext.tsx
import { UserRole } from "@/utils/shared/shared-types/prisma-enums";
import { IProviderAdminLoginData } from "@/utils/shared/shared-types/userModels";
import { MdOutlineDashboard,  } from "react-icons/md";
 
import {
    createContext,
    useContext,
    useState, 
    ReactNode,
  } from "react";  
import { GiPostOffice } from "react-icons/gi";
import { usePathname, useRouter } from "next/navigation";
import { UserGroupIcon } from "@heroicons/react/20/solid";
import { useAuth } from "./AuthContext";
import AppIcon from "@/components/ui-components/AppIcon/CommonIcon";
import { IconName } from "@/components/ui-components/AppIcon/icon-list";

export const ShopsIcon = ({size} : {
  size?: number;
}) => {
  return <GiPostOffice size={size ?? 24} />
}

  
  export interface INavItem {
    label: string,
    icon?: ReactNode;
    href: string;
    subNavs?: INavItem[]; 
  }

  interface ILayoutContextProps {
    toggled: boolean;
    setToggled: (toggled: boolean) => void; 
    collapsed: boolean;
    setCollapsed:  (collapsed: boolean) => void;
    toggleMenu:  () => void;
    navItems: INavItem[]; 
  }
  
  const LayoutContext = createContext<ILayoutContextProps | undefined>(undefined);
  
  export const LayoutProvider = ({  children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [toggled, setToggled] = useState(false)

const {user} = useAuth()


  
  const getNavItemsPerRole = ():INavItem[] => {
    switch (user.role) {
        case UserRole.PROVIDER_SUPER_ADMIN:
            return [
                {
                    label: "Dashboard",
                    icon: <MdOutlineDashboard size={24} />,
                    href: "",
                },
                {
                    label: "Shop Management",
                    icon: <AppIcon name={IconName.GitShop} size={24} />,
                    href: "shops",
                },
                {
                  label: "Users",
                  icon: <UserGroupIcon width={24} />,
                  href: "",
                  subNavs: [
                    {
                      label: "Super Agents", 
                      href: "super-agents",
                    },
                    {
                      label: "Agents", 
                      href: "agents",
                    }
                  ]
              }
            ] 
        default:
            return [
                
            ] 
    }
  }

  const  toggleMenu = () => {
    console.log("Toggled", toggled)
    setCollapsed(!collapsed); 
    setToggled(!toggled) 
  }

  const navItems = getNavItemsPerRole()  
    return (
      <LayoutContext.Provider value={{ 
        collapsed, 
        setCollapsed,
       toggleMenu,
        toggled, 
        setToggled, 
       
        navItems 
        }}>
        {children}
      </LayoutContext.Provider>
    );
  };
  
  export const useAppLayout = () => {
    const context = useContext(LayoutContext);
    if (context === undefined) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };
  