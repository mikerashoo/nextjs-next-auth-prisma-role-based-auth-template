import AppTable, {
  IAppTableRowProps,
} from "@/components/ui-components/AppTable";
import { ActiveStatus } from "@/lib/enums";
import { GENERAL_ERROR_MESSAGE } from "@/utils/constants";
import { DeleteIcon } from "@chakra-ui/icons";
import React from "react";
import { IDBCashier } from "@/utils/shared/shared-types/prisma-models";
import { Heading, useToast } from "@chakra-ui/react";
import AddCashierToBranch from "./AddCashierToBranch";
import { HeadlessButton } from "@/components/ui-components/AppButton";
import { useBranchCashiersContext } from "@/contexts/branch-contexts/BranchCashierContext"; 
import { ConfirmationDialog, ConfirmationDialogWithSwitch } from "@/components/ui-components/modals/ConfirmationDialog";
import ChangeCashierPassword from "./ChangeCashierPassword"; 
import { cashierApiCalls } from "@/backend-services/cashiers/cashier-management-api-calls";
import EditCashier from "./EditCashier";

function BranchCashierList() {
  const { cashiers, loading, branchId, error, onDelete, onUpdate, reload } =
    useBranchCashiersContext();

  const columns = ["Name", "User Name", "Phone Number", "Status", <></>];

  const toast = useToast();

  const sortedByName: IDBCashier[] = (cashiers ?? []).sort((a, b) => a.firstName > b.lastName ? 1 : a.firstName <  b.lastName ? -1 : 0);

  const rows: IAppTableRowProps[] = sortedByName.map((cashier: IDBCashier) => {
      const deleteBranch = async (): Promise<boolean> => {
        const deleteData = await cashierApiCalls.delete( 
          cashier.id,
        );
        if (deleteData.errorMessage) {
          toast({
            title: deleteData.errorMessage,
            status: "error",
          });
          return false;
        } else {
          toast({
            title: "Cashier Deleted Successfully",
            status: "success",
          });

          onDelete(cashier.id);
          return deleteData.data;
        }
      };

      const changeCashierStatus = async (): Promise<boolean> => {
        const statusChangeData = await cashierApiCalls.changeStatus( 
          cashier.id,
        );
        if (statusChangeData.errorMessage) {
          toast({
            title: GENERAL_ERROR_MESSAGE,
            status: "error",
          });
          return false;
        } else {
          toast({
            title: "Cashier Status Updated Successfully",
            status: "success",
          });

          onUpdate(statusChangeData.data)
          return true;
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
          title={"Delete " + cashier.firstName + " " + cashier.lastName + "?"}
          message="Are you sure you want to delete this cashier?"
          onConfirm={() => deleteBranch()}
          confirmButtonLabel="Yes Delete!"
          cancelButtonLabel="No Close!"
        />
      );

      const changeStatusDialog = (
        <ConfirmationDialogWithSwitch
          isChecked={cashier.status == ActiveStatus.ACTIVE ? true : false}
          title={"Delete " + cashier.firstName + " " + cashier.lastName + "?"}
          message={`Are you sure you want to ${cashier.status == ActiveStatus.ACTIVE ? 'Disable' : 'Activate'} this cashier?`}
          onConfirm={() => changeCashierStatus()}
          confirmButtonLabel={`Yes ${cashier.status == ActiveStatus.ACTIVE ? 'Disable' : 'Activate'}!`}
          cancelButtonLabel="No Close!"
        />
      );

      return {
        key: cashier.id.slice(5),
        columns: [
          `${cashier.firstName} ${cashier.lastName}`,
          `${cashier.userName}`,
          `${cashier.phoneNumber}`,
 
         <span key={'status'}>  { cashier.status == ActiveStatus.ACTIVE ? "Active" : "Disabled"}  {changeStatusDialog} </span>,

          <div
            key={cashier.id + "action"}
            className="flex flex-row gap-2 justify-center "
          >
            <ChangeCashierPassword cashier={cashier} />
            <EditCashier cashier={cashier} /> 
         

            {confirmDelete}
          </div>,
        ],
      };
    }
  );
  return (
    <div className="w-full"> 
      <AppTable
        caption={{
          // title: "Cashiers",
          extra: (
            <div className="flex justify-between gap-4">
              <Heading color={"teal.500"} size={"lg"}>
                Cashiers
              </Heading>
              <AddCashierToBranch branchId={branchId} />
            </div>
          ),
        }}
        loading={loading}
        error={error}
        columns={columns}
        onReload={reload}
        rows={rows}
        columnsToHideOnMobile={[1, 2]}
      />
    </div>
  );
}

export default BranchCashierList;
