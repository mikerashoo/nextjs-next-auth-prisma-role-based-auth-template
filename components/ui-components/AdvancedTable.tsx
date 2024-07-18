import { WarningTwoIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import * as React from "react";
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import AppIcon from "./AppIcon/CommonIcon";
import { IconName } from "./AppIcon/icon-list";
export interface ITableProps<T> {
  loading?: boolean;
  error?: string;
  data?: T[];
  onReload?: () => void;
}

export interface IAdvancedTableColumnProps<T> {
  label: any;
  selectorFunction?: (item: T) => any;
  selectorKey?: string;
}

export interface IActionProps<T> {
  label: any;
  onClick?: (item: T) => any; 
}

export interface IAdvancedTableProps<T> {
  loading?: boolean;
  error?: string;
  columns: IAdvancedTableColumnProps<T>[];

  primaryCol?: String;
  actions?: IActionProps<T>[];

  data: T[];
  onReload?: () => void;
  itemsPerPage?: number;
}

const AdvancedTable = ({
  columns,
  data,
  actions,
  primaryCol,
}: IAdvancedTableProps<any>) => {
  const menus = (item: any) => ( !actions || actions.length == 0 ? <></> :
    <Menu isLazy>
      <MenuButton className="px-1 ">
        <AppIcon name={IconName.EllipsisVertical} size={20}/>
      </MenuButton>
      <Portal>
        <MenuList className="z-50">
          {
            actions.map((action, actionIndex) =>   <MenuItem key={'actions'} onClick={() => action.onClick(item)}>{action.label}</MenuItem>)
          }
        
          
        </MenuList>
      </Portal>
    </Menu>
  );
  return (
    <TableContainer className="flex w-full h-full">
      <Table className="w-full rounded-md h-full">
        <Thead className="bg-white w-full">
          <Tr className="relative">
            {columns.map((col, headerIndex) => {
              const { label } = col;
              const isPrimary = primaryCol == col.label;
              return (
                <Th
                  key={col.label ?? headerIndex}
                  className={`${
                    isPrimary ? "sticky left-0 bg-white z-30 md:table-cell" : ""
                  } `}
                >
                  {label}
                </Th>
              );
            })}
            {actions && actions.length && (
              <Th className="hidden md:table-cell text-end "></Th>
            )}
          </Tr>
        </Thead>

        <Tbody className="w-full h-full">
          {data.map((data, dataIndex) => {
            return (
              <Tr
                key={dataIndex}
                className=" bg-slate-50 hover:shadow-lg hover:bg-slate-100 cursor-pointer"
              >
                {columns.map((col, headerIndex) => {
                  const { label, selectorFunction, selectorKey } = col;
                  const isPrimary = primaryCol == col.label;

                  return (
                    <Td
                      key={col.label + dataIndex}
                      className={`${
                        isPrimary
                          ? "sticky flex justify-start items-center gap-2 h-full bg-inherit left-0 md:table-cell"
                          : ""
                      } `}
                    >
                          {isPrimary && actions && actions.length && <span className="md:hidden"> {menus(data)} </span> }
                      {selectorKey
                        ? data[selectorKey] ?? "-"
                        : selectorFunction
                        ? selectorFunction(data)
                        : "-"}
                    </Td>
                  );
                })}
                {actions && actions.length && (
                  <Td className="hidden md:table-cell text-end ">{menus(data)}</Td>
                )}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {data.length == 0 && (
        <div className="flex w-full h-full min-h-96 items-center justify-center">
          <WarningTwoIcon boxSize={"50px"} color={"orange.300"} />
          <Heading color={"orange.200"} as="h2" size="xl" mt={6} mb={2}>
            No Data
          </Heading>
        </div>
      )}
    </TableContainer>
  );
};

export default AdvancedTable;
