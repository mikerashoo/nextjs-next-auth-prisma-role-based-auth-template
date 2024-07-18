import FilterByPeriodCombo from "@/components/date-filter/FilterByPeriodCombo";
import SelectComboBox from "@/components/ui-components/SelectComboBox";
import { useBranchCashiersContext } from "@/contexts/branch-contexts/BranchCashierContext";
import {
  useBranchReportContext,
} from "@/contexts/branch-contexts/BranchReportContext";
import { GameType } from "@/utils/shared/shared-types/prisma-enums";
import {
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

function BranchReportFilter() {
  const {
    loading,
    error,
    reload,
    onFilterValuesChange,
    filterLabel,
    onFilter,
  } = useBranchReportContext();
  const { cashiers } = useBranchCashiersContext();

  const { isOpen, onToggle, onClose } = useDisclosure();

  const filterContent = (
    <div className=" w-full flex flex-col md:flex-row justify-between items-center ">
      <FilterByPeriodCombo
        onValuesChange={(values) => {
          onFilterValuesChange({
            startAndEd: values,
          });
        }}
      />
      <div className="w-fit flex flex-row items-start gap-4 ">
        <SelectComboBox
          options={(cashiers ?? []).map((cashier) => {
            return {
              label: cashier.userName,
              value: cashier.id,
            };
          })}
          placeHolder="All Cashiers"
          onSelect={(selected) =>
            onFilterValuesChange({
              cashierId: selected,
            })
          }
          key="cashier"
        />

        <SelectComboBox
          options={Object.keys(GameType).map((gameType) => {
            return {
              label: gameType.toString().replace("_", " "),
              value: gameType,
            };
          })}
          placeHolder="All Games"
          onSelect={(selected) => {
            onFilterValuesChange({
              gameType: selected as GameType,
            });
          }}
          key="Game Type"
        />
      </div>
    </div>
  );

  return ( <div className=" w-full flex flex-col md:flex-row gap-4 justify-between items-center  ">
    <FilterByPeriodCombo
      onValuesChange={(values) => {
        onFilterValuesChange({
          startAndEd: values,
        });
      }}
    />
    <div className="w-full md:w-fit flex flex-col md:flex-row items-start gap-2 ">
      <SelectComboBox
        options={(cashiers ?? []).map((cashier) => {
          return {
            label: cashier.userName,
            value: cashier.id,
          };
        })}
        placeHolder="All Cashiers"
        onSelect={(selected) =>
          onFilterValuesChange({
            cashierId: selected,
          })
        }
        key="cashier"
      />

      <SelectComboBox
        options={Object.keys(GameType).map((gameType) => {
          return {
            label: gameType.toString().replace("_", " "),
            value: gameType,
          };
        })}
        placeHolder="All Games"
        onSelect={(selected) => {
          onFilterValuesChange({
            gameType: selected as GameType,
          });
        }}
        key="Game Type"
      />
    </div>
  </div>)
 
}

export default BranchReportFilter;
