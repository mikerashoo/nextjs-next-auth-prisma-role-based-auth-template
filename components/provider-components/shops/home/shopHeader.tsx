import React from "react";
import PageHeader from "../../../ui-components/PageHeader"; 
import { StarIcon, LockIcon } from "@chakra-ui/icons";
import { ArrowTrendingUpIcon } from "@heroicons/react/20/solid";
import { useShopListContext } from "@/contexts/shop-contexts/ShopIListContext";  
import { ActiveStatus } from "@/utils/shared/shared-types/prisma-enums";
import AddShopForm from "./AddshopForm";

interface IShopHeaderProps {
   
}

export default function ShopHeader({
 
}: IShopHeaderProps) {

  const {shops, error, loading, reload} = useShopListContext();
  
  return (
    <PageHeader
      title={"Shops"}
      statics={[
        {
          label: shops.length + " Total shops",
          icon: <ArrowTrendingUpIcon width={16} />,
        },
        {
          label:
            shops.filter((br) => br.status == ActiveStatus.ACTIVE).length +
            " Active shops",
          icon: <StarIcon />,
        },

        {
          label:
            shops.filter((br) => br.status == ActiveStatus.IN_ACTIVE)
              .length + " Deactivated shops",
          icon: <LockIcon />,
        },
      ]}
      actions={[!error && !loading && <AddShopForm key={"add"} />]}
    />
  );
}
 
