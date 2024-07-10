import React, { useEffect, useState } from "react";
import AppTable, {
  IAppTableRowProps,
  TableHeadingSortButton,
  TableSortOrder,
} from "../../ui-components/AppTable";
import { IDBBranch } from "@/utils/shared/shared-types/prisma-models";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { HeadlessButton } from "../../ui-components/AppButton";
import {
  AtSignIcon,
  DeleteIcon,
  SearchIcon,
  InfoOutlineIcon,
} from "@chakra-ui/icons";
import { compareAsc, compareDesc } from "date-fns";
import { ActiveStatus } from "@/utils/shared/shared-types/prisma-enums"; 
import { branchInformationApiService } from "@/backend-services/branches/information";
import { GENERAL_ERROR_MESSAGE } from "@/utils/constants";
import { useBranchListContext } from "@/contexts/branch-contexts/BranchIListContext";
import EditBranch from "./EditBranch";
import AppLink from "../../ui-components/AppLink"; 
import { ConfirmationDialog } from "@/components/ui-components/modals/ConfirmationDialog";

enum BranchSortBy {
  name = "name",
  status = "status",
  createdAt = "createdAt",
}

function BranchListTable() {

  const {branches, error, loading, reload} = useBranchListContext();
 
  const [branchList, setBranches] = useState<IDBBranch[]>(branches);
  const [sortedBy, setSortedBy] = useState<BranchSortBy>(BranchSortBy.name);
  const [currentSortOrder, setCurrentOrder] = useState<TableSortOrder>(
    TableSortOrder.asc
  );

  const toast = useToast();

  useEffect(() => {
    const getSortValue = (branchA: IDBBranch, branchB: IDBBranch): number => {
      let value = 0;
      switch (sortedBy) {
        case BranchSortBy.name:
          if (branchA.name.toLowerCase() < branchB.name.toLowerCase())
            value = -1;
          if (branchA.name.toLowerCase() > branchB.name.toLowerCase())
            value = 1;
          break;

        case BranchSortBy.createdAt:
          return currentSortOrder == TableSortOrder.asc
            ? compareAsc(branchA.createdAt, branchB.createdAt)
            : compareDesc(branchA.createdAt, branchB.createdAt);

        case BranchSortBy.status:
          let aStatus = branchA.status == ActiveStatus.ACTIVE ? 5 : 4;
          let bStatus = branchB.status == ActiveStatus.ACTIVE ? 5 : 4;
          if (aStatus < bStatus) value = -1;
          if (aStatus > bStatus) value = 1;

          break;

        default:
          break;
      }

      return currentSortOrder == TableSortOrder.asc ? value : -1 * value;
    };

    let _sorted = branches.sort((a, b) => getSortValue(a, b));
    setBranches(_sorted);
  }, [sortedBy, currentSortOrder, branches]);

  const onSortToggle = (columnToSort: BranchSortBy) => {
    if (sortedBy == columnToSort) {
      setCurrentOrder(
        currentSortOrder == TableSortOrder.asc
          ? TableSortOrder.desc
          : TableSortOrder.asc
      );
    } else {
      setSortedBy(columnToSort);
      setCurrentOrder(TableSortOrder.asc);
    }
  };

  const columns = [
    <div className="items-center h-full justify-start flex" key={"name"}>
      Name{" "}
      <TableHeadingSortButton
        selected={sortedBy != BranchSortBy.name ? null : currentSortOrder}
        onToggle={() => onSortToggle(BranchSortBy.name)}
      />
    </div>,
    "Address",
    <div className="items-center h-full justify-start flex" key={"status"}>
      Status{" "}
      <TableHeadingSortButton
        selected={sortedBy != BranchSortBy.status ? null : currentSortOrder}
        onToggle={() => onSortToggle(BranchSortBy.status)}
      />
    </div>,

    <div className="items-center h-full justify-start flex" key={"created"}>
      Added At{" "}
      <TableHeadingSortButton
        selected={sortedBy != BranchSortBy.createdAt ? null : currentSortOrder}
        onToggle={() => onSortToggle(BranchSortBy.createdAt)}
      />
    </div>,
    <></>,
  ];

  const rows: IAppTableRowProps[] = branches.map((branch: IDBBranch) => {
    const deleteBranch = async (): Promise<boolean> => {
      const selectedBranchId = branch.id;
      const deleteData = await branchInformationApiService.delete(selectedBranchId);
      if(deleteData.errorMessage){
        toast({
          title: GENERAL_ERROR_MESSAGE,
          status: 'error',

          
        })
        return false;
      }
      else {
        toast({
          title: "Branch Deleted Successfully",
          status: 'success',
        })

        reload()
      return deleteData.data; 

      }
    };

    const confirmDelete = (
      <ConfirmationDialog 
        openButtonLabel={
          <>
            {" "}
            <DeleteIcon /> Delete{" "}
          </>
        }
        title={"Delete " + branch.name + "?"}
        message="Are you sure you want to delete this branch?"
        onConfirm={() => deleteBranch()}
        confirmButtonLabel="Yes Delete!"
        cancelButtonLabel="No Close!"
      />
    );

    return {
      key: branch.id.slice(5),
      columns: [
        branch.name,
        branch.address,
        <div key={"status"} className="flex items-center">
          <div
            className={`h-2.5 w-2.5 rounded-full ${
              branch.status == ActiveStatus.ACTIVE
                ? "bg-green-500"
                : "bg-red-500"
            } me-2`}
          ></div>{" "}
          {branch.status == ActiveStatus.ACTIVE ? "Active" : "Disabled"}
        </div>,
        // branch.status,
        new Date(branch.createdAt).toLocaleString(),

        <div key={branch.name + "action"} className="flex flex-row gap-2 "> 
          <AppLink href={branch.identifier}>
            <><InfoOutlineIcon /> Detail </>
          </AppLink>

          <EditBranch  branch={branch} />

          {confirmDelete}

          {/* <HeadlessButton status={-2} size={'xs'} >
         
          </HeadlessButton> */}
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
      caption={{
        extra: <Stack
            direction={{ base: "column", md: "row" }}
            spacing={4}
            p={4}
            className="max-w-screen-lg"
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
