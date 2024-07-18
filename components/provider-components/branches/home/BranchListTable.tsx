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
import { useBranchListContext } from "@/contexts/branch-contexts/BranchIListContext";
import AppLink from "../../../ui-components/AppLink"; 
import { IBranchWithDetail } from "@/utils/shared/shared-types/providerAndBranch";
import { getAgentSuperAgent, getFullName, getFullNameForAgent } from "@/utils/common-hepers";

enum BranchSortBy {
  name = "name",
  status = "status",
  createdAt = "createdAt",
}

function BranchListTable() {

  const {branches, error, loading, reload} = useBranchListContext();
 
  const [branchList, setBranches] = useState<IBranchWithDetail[]>(branches);
  
 
  const columns = [
    'Name', 
    'Agent/Super Agent🔥',
    'Status',
    ''
    
  ];

  const rows: IAppTableRowProps[] = branches.map((branch: IBranchWithDetail) => {
    
const {agent} = branch
    return {
      key: branch.id.slice(5),
      href: `branches/${branch.identifier}`,
      actionFromStart: true,
      columns: [
        branch.name, 
        agent ? getAgentSuperAgent(agent) : '-',
        <div key={"status"} className="flex items-center w-fit ">
          <div
            className={`h-2.5 w-2.5 rounded-full ${
              branch.status == ActiveStatus.ACTIVE
                ? "bg-green-500"
                : "bg-red-500"
            } me-2`}
          ></div>{" "}
          {branch.status == ActiveStatus.ACTIVE ? "Active" : "Disabled"}
        </div>, 

        <div key={branch.name + "action"} className="flex flex-row gap-2 "> 
          <AppLink fromHome href={`branches/${branch.identifier}`}>
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
                  setBranches(
                    branchList.filter((dBranch) =>
                      dBranch.name
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
                  setBranches(
                    branchList.filter((dBranch) =>
                      dBranch.address
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


export default BranchListTable;
