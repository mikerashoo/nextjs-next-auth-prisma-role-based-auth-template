import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  menuClasses,
} from "react-pro-sidebar";

import React, { ReactNode, use, useEffect } from "react";
// import { INavItem, useAppLayout } from "@/contexts/LayoutContext";
import Logo, { LogoIcon } from "../common/Logo";
import { Heading, IconButton } from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useAuth } from "@/contexts/AuthContext"; 

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { UserRole } from "@/utils/shared/shared-types/prisma-enums";
import { UserGroupIcon } from "@heroicons/react/20/solid";
import { MdOutlineDashboard } from "react-icons/md";
import AppIcon from "../ui-components/AppIcon/CommonIcon";
import { IconName } from "../ui-components/AppIcon/icon-list";

export interface INavItem {
  label: string;
  icon?: ReactNode;
  href: string;
  subNavs?: INavItem[];
}

const bg = "conic-gradient(at top left, #10b981, #0e7490, #3b82f6)";

const textColor = "#9dabaa";
const activeTextColor = "white";

export const getNavItemsPerRole = (role: string): INavItem[] => {
  switch (role) {
    case UserRole.PROVIDER_SUPER_ADMIN:
      return [
        {
          label: "Dashboard",
          icon: <MdOutlineDashboard size={24} />,
          href: "",
        },
        {
          label: "Shops",
          icon: <AppIcon name={IconName.ShoppingCart} />,
          href: "shops",
        },
        {
          label: "Cashiers",
          icon: <AppIcon name={IconName.UserX} />,
          href: "cashiers",
        },
        {
          label: "Agents",
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
            },
          ],
        },
      ];
    default:
      return [];
  }
};

export const menuForSideBar = ({
  activeLink,
  navItems,
  onClick,
}: {
  activeLink: string;
  navItems: INavItem[];
  onClick: any;
}) => {
  return (
    <Menu
      closeOnClick
      menuItemStyles={{
        icon: ({ active }) => ({
          color: active ? activeTextColor : textColor,
        }),
        button: ({ active }) => ({
          backgroundColor: active ? "#26A69A" : undefined,
          fontWeight: active ? "bold" : undefined,
          color: active ? activeTextColor : textColor,
          "&:hover": {
            backgroundColor: "#26A69A",
            color: "white",
          },
        }),
      }}
    >
      {navItems.map((nav) => {
        const { label, subNavs, href } = nav;
        const navLink = "/" + href;
        let isActive = activeLink === nav.href;

        if (subNavs && subNavs.length > 0) {
          isActive = subNavs.some((subNav) => activeLink === subNav.href);

          return (
            <SubMenu
              key={nav.label}
              label={nav.label}
              active={isActive}
              icon={nav.icon}
              defaultOpen={isActive}
              rootStyles={{
                ["& > ." + menuClasses.button]: {
                  backgroundColor: bg,
                  color: textColor,
                  "&:hover": {
                    backgroundColor: "#3eafc9",
                  },
                },
                ["." + menuClasses.subMenuContent]: {
                  backgroundColor: "inherit",
                },
              }}
            >
              {subNavs.map((subNav) => {
                const subNavLink = "/" + subNav.href;
                let isSubActive = activeLink === subNav.href;

                return (
                  <MenuItem
                    component={<Link href={subNavLink} />}
                    // onClick={() => handleNavigation()}
                    suffix={isSubActive && "🔥"}
                    active={isSubActive}
                    key={subNav.href}
                    onClick={onClick}
                  >
                    {subNav.label}
                  </MenuItem>
                );
              })}
            </SubMenu>
          );
        }
        return (
          <MenuItem
            suffix={isActive && "🔥"}
            active={isActive}
            key={nav.label}
            icon={nav.icon}
            component={<Link href={navLink} />}
            onClick={onClick}

            // onClick={() => handleNavigation()}
          >
            {nav.label}
          </MenuItem>
        );
      })}
    </Menu>
  );
};

export function MobileSideNav({
  toggled,
  setToggled,
  user,
}: {
  toggled: boolean;
  setToggled: (toggled: boolean) => void;
  user;
}) {
  const navItems = getNavItemsPerRole(user.role);
  const pathname = usePathname();
  const menus = menuForSideBar({
    activeLink: pathname.toString().split("/")[1],
    navItems: navItems,
    onClick: () => setToggled(false),
  });

  return (
    // <div style={{ display: "flex", height: "100%", minHeight: "400px" }}>
    <Sidebar
      onBackdropClick={() => setToggled(false)}
      toggled={toggled}
      breakPoint="all"
      backgroundColor={bg}
      style={{
        background: "conic-gradient(at top left, #10b981, #0e7490, #3b82f6)",
      }}
    >
        <div style={{
        background: "conic-gradient(at top left, #42cfa0, #0e7490, #588fe7)",
      }} className="flex flex-row justify-center items-center gap-4 w-full px-2 py-8">
       
          <Heading color={'white'}>
            { user.provider.name}
          </Heading> 
      </div>
      {menus}
    </Sidebar>
    // </div>
  );
}

export function DesktopSideNav({
  collapsed,
  setCollapsed,
  user,
}: {
  collapsed: boolean;
  setCollapsed: (toggled: boolean) => void;
  user;
}) {
  const navItems = getNavItemsPerRole(user.role);
  const pathname = usePathname();
  const menus = menuForSideBar({
    activeLink: pathname.toString().split("/")[1],
    navItems: navItems,
    onClick: () => setCollapsed(false),
  });

  return (
    <Sidebar
      collapsed={collapsed}
      backgroundColor={bg}
      style={{
        background: "conic-gradient(at top left, #10b981, #0e7490, #3b82f6)",
      }}
    >
      <div
        className={`flex w-full p-2 items-center ${
          collapsed ? "justify-center flex-col-reverse" : "justify-between"
        }`}
      >
        {!collapsed && <Logo />}
        <IconButton
          color={{
            base: "teal",
            md: "white",
          }}
          _hover={{
            bg: "#e1fff4",
            color: "teal",
          }}
          onClick={() => setCollapsed(!collapsed)}
          icon={<HamburgerIcon w={5} h={5} />}
          variant={"ghost"}
          aria-label={"Toggle Navigation"}
        />
      </div>

      <div className="flex flex-row justify-center items-center gap-4 w-full px-2 py-8">
        <div
          className={`${
            collapsed
              ? "bg-teal-400 rounded-full flex justify-center items-center w-12 h-12"
              : "bg-transparent rounded-none p-0"
          }`}
        >
          <Heading color={collapsed ? "#cedfdf" : "white"}>
            {" "}
            {collapsed ? user.provider.name.charAt(0) : user.provider.name}
          </Heading>
        </div>
      </div>
      {menus}
    </Sidebar>
  );
} 