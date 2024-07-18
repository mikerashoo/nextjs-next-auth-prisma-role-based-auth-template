import React, { useEffect, useState } from "react";
import AppTable, {
  IAppTableRowProps,
  TableSortOrder,
} from "../../../ui-components/AppTable"; 
import {
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useToast,
} from "@chakra-ui/react";
import {
  AtSignIcon,
  SearchIcon,
  InfoOutlineIcon,
} from "@chakra-ui/icons";
import { ActiveStatus } from "@/utils/shared/shared-types/prisma-enums"; 
import { useShopListContext } from "@/contexts/shop-contexts/ShopIListContext";
import AppLink from "../../../ui-components/AppLink"; 
import { IShopWithDetail } from "@/utils/shared/shared-types/providerAndShop";
import { getAgentSuperAgent, getFullName, getFullNameForAgent } from "@/utils/common-hepers";

enum ShopSortBy {
  name = "name",
  status = "status",
  createdAt = "createdAt",
}

function ShopListTable() {

  const {shops, error, loading, reload} = useShopListContext();
 
  const [shopList, setShops] = useState<IShopWithDetail[]>(shops);
  
 
  const columns = [
    'Name', 
    'Agent/Super Agent🔥',
    'Status',
    ''
    
  ];

  const rows: IAppTableRowProps[] = shops.map((shop: IShopWithDetail) => {
    
const {agent} = shop
    return {
      key: shop.id.slice(5),
      href: `shops/${shop.identifier}`,
      actionFromStart: true,
      columns: [
        shop.name, 
        agent ? getAgentSuperAgent(agent) : '-',
        <div key={"status"} className="flex items-center w-fit ">
          <div
            className={`h-2.5 w-2.5 rounded-full ${
              shop.status == ActiveStatus.ACTIVE
                ? "bg-green-500"
                : "bg-red-500"
            } me-2`}
          ></div>{" "}
          {shop.status == ActiveStatus.ACTIVE ? "Active" : "Disabled"}
        </div>, 

        <div key={shop.name + "action"} className="flex flex-row gap-2 "> 
          <AppLink fromHome href={`shops/${shop.identifier}`}>
            <><InfoOutlineIcon /> Detail </>
          </AppLink>
 
        </div>,
      ],
    };
  });

  return (
    <AppTable
      loading={loading}
      error={error}
      columns={columns}
      rows={rows}
      columnsToHideOnMobile={[2]}
      caption={{
        extra: <Stack
            direction={{ base: "column", md: "row" }}
            spacing={4}
            p={4}
             
          >
            <InputGroup className="w-fit">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                onChange={(e) =>
                  setShops(
                    shopList.filter((dShop) =>
                      dShop.name
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                    )
                  )
                }
                type="tel"
                placeholder="Search By Name"
              />
            </InputGroup>
  
            <InputGroup className="w-fit">
              <InputLeftElement pointerEvents="none">
                <AtSignIcon color="gray.300" />
              </InputLeftElement>
              <Input
                onChange={(e) =>
                  setShops(
                    shopList.filter((dShop) =>
                      dShop.address
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                    )
                  )
                }
                placeholder="Search By Address"
              />
            </InputGroup>
          </Stack>
        
      }}
      
    />
  );
}


export default ShopListTable;
