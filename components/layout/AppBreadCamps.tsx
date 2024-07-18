import { capitalizeFirst } from "@/utils/constants";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";


const PageBreadCrumbs = () => {
    const pathnames = usePathname();
    const paths = usePathname();
    const pathNames = paths.split("/").filter((path) => path);
    const pathItems = pathNames.map((path, i) => ({
      // Optionally you can capitalize the first letter here
      name: capitalizeFirst(path),
      path: "/" + pathNames.slice(undefined, i + 1).join("/"),
      isCurrent: pathNames.indexOf(path) == pathNames.length - 1,
    }));
    return pathItems.length == 1 ? (
      <></>
    ) : (
      <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
        {pathNames.map((link, index) => {
          let href = `/${pathNames.slice(0, index + 1).join("/")}`;
          // let itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses
          let itemLink = link[0].toUpperCase() + link.slice(1, link.length);
          return (
            <BreadcrumbItem key={index}>
              {index == pathNames.length - 1 ? (
                <p> {itemLink} </p>
              ) : (
                <Link href={href}>{itemLink}</Link>
              )}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    );
  };
  