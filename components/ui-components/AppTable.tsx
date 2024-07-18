import { GENERAL_ERROR_MESSAGE } from "@/utils/constants";
import { cn } from "@/utils/tableMerger";
import {
  TriangleDownIcon,
  TriangleUpIcon,
  UpDownIcon,
  WarningTwoIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Card,
  CardBody,
  FormErrorIcon,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import GeneralErrorComponent from "./GeneralErrorComponent";
import { usePathname, useRouter } from "next/navigation";
import { HeadlessButton } from "./AppButton";
import AppLink from "./AppLink";
import Link from "next/link";
import index from "@/pages/agents";

export interface ITableProps<T> {
  loading?: boolean;
  error?: string;
  data?: T[];
  onReload?: () => void;
}

export interface IAppTableRowProps {
  columns: any[];
  key: string;
  href?: string;
  actionFromStart?: boolean;
  mobileView?: {
    heading: any;
    actionUrl?: string;
    columns: {
      label: string;
      value: any;
    }[];
  };
}

export interface TableCaption {
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  extra?: React.ReactNode;
}

export interface IAppTableProps {
  loading?: boolean;
  error?: string;
  columns: any[];
  rows: IAppTableRowProps[];
  onReload?: () => void;
  caption?: TableCaption;
  itemsPerPage?: number;
  columnsToHideOnMobile?: number[];
}

const getHiddenOnMobileClass = (
  index: number,
  toHideIndexes: number[]
): string => {
  return (toHideIndexes ?? []).includes(index)
    ? "hidden md:table-cell"
    : "table-cell";
};
function AppTable({
  columns,
  rows,
  loading,
  error,
  onReload,
  
  caption,
  itemsPerPage = 10,
  columnsToHideOnMobile,
}: IAppTableProps) {
  let perPage = itemsPerPage > rows.length ? rows.length : itemsPerPage;

  const pageCount = Math.ceil(rows.length / perPage);
  const [currentPage, setCurrentPage] = React.useState<number>(0);

  const startIndex = currentPage * perPage;
  const lastIndex = startIndex + perPage;

  const currentItems = rows.slice(startIndex, lastIndex);
  const pathname = usePathname();

  console.log("Current page", currentPage);

  React.useEffect(() => {
    setCurrentPage(0);
  }, [rows]);

  const lgTableView = (
    <table className="min-w-full border divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((column, index) => {
            return (
              <th
                className={`px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase ${getHiddenOnMobileClass(
                  index,
                  columnsToHideOnMobile
                )}`}
                key={"column-" + column.toString()}
              >
                {column}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        <TableRowUI
          loading={loading}
          error={error}
          columns={columns}
          columnsToHideOnMobile={columnsToHideOnMobile}
          rows={currentItems}
          onReload={onReload}
        />
      </tbody>
    </table>
  );

  const mobileView = (
    <div className="relative flex flex-col w-full ">
      <nav className="flex w-full flex-col gap-2 font-sans text-base font-normal">
        {
          rows.length == 0 && (
            <Box textAlign="center" py={16} px={6}>
            <WarningTwoIcon boxSize={"50px"} color={"orange.300"} />
            <Heading color={"orange.200"} as="h2" size="xl" mt={6} mb={2}>
              No Data
            </Heading>
            <Text color={"gray.500"}>No data available in table</Text>
          </Box>
          )
        }
        {rows.map((rowData, rowIndex) => {
          const { mobileView, href, columns: rowColumns, actionFromStart } = rowData; 

          const path = href ? actionFromStart ? `/${href}` : pathname + "/" + href : ''; 

          return (
            <span key={rowData.key}> 
                <LinkBox
                  
                
                  className="w-full  flex hover:shadow-lg bg-slate-50 hover:bg-slate-200"
                >
                 
                  <Card className="w-full">
                  <CardBody>
                  <LinkOverlay   href={path}>
                    {mobileView ? (
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          {mobileView ? mobileView.heading : rowColumns[0]}
                        </Heading>
                        {mobileView.columns.map((rowCol, ind) => (
                          <Text key={ind} pt="2" fontSize="sm">
                            {rowCol.label}{" "}
                            <span className="font-bold">{rowCol.value}</span>
                          </Text>
                        ))}
                        {mobileView.actionUrl && (
                          <AppLink href={mobileView.actionUrl}>
                            {" "}
                            Detail{" "}
                          </AppLink>
                        )}
                      </Box>
                    ) : (
                      <>
                        {rowColumns.map((rowColumn, rowColumnIndex) => {
                          return (
                            <Box key={rowColumnIndex}>
                              {rowColumnIndex == 0 ? (
                                <Heading size="xs" textTransform="uppercase">
                                  {rowColumns[rowColumnIndex]}
                                </Heading>
                              ) : (
                                <Text key={rowColumnIndex} pt="2" fontSize="sm" className="flex flex-row gap-2 w-full">
                                  {rowColumnIndex < columns.length
                                    ? columns[rowColumnIndex]
                                    : ""}
                                  <span className="font-bold">
                                    {rowColumns[rowColumnIndex]}
                                  </span>
                                </Text>
                              )}
                            </Box>
                          );
                        })}
                      </>
                    )}
                    </LinkOverlay>
                  </CardBody>
                  </Card>
                </LinkBox>
              
            </span>
          );
        })}
      </nav>
    </div>
  );
  return (
    <div className="relative overflow-x-auto h-full w-full gap-2">
      <Box
        display={{
          base: "none",
          md: "flex",
        }}
        className="w-full"
      >
        {lgTableView}
      </Box>

      <Box
        display={{
          base: "block",
          md: "none",
        }}
        className="w-full"
      >
        {mobileView}
      </Box>
      {/* <table className="w-full text-sm text-left rtl:text-right text-gray-500  px-2 dark:text-gray-400 rounded-lg shadow-sm h-fit">
        {
          caption && (
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-slate-50 dark:text-white dark:bg-gray-800">
           {caption.title}
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">{caption.description}</p>
            {caption.extra}
        </caption>
          )
        }
   
        <thead className="text-xs   text-gray-700 uppercase bg-gray-50 border mx-2 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((column, index) =>{
              return (
              <th scope="col" className={`px-6 py-3 ${index == 0 ? 'text-start' : 'text-center'} ${getHiddenOnMobileClass(index, columnsToHideOnMobile)}`} key={"column-" + index}>
                {column}
              </th>
            )}
            
            )}
          </tr>
        </thead>
        <tbody>
          <TableRowUI
            loading={loading}
            error={error}
            columns={columns}
            columnsToHideOnMobile={columnsToHideOnMobile}
            rows={currentItems}
            onReload={onReload}
          />
        </tbody>
      </table> */}

      <TablePagination
        loading={loading}
        error={error}
        currentPage={currentPage}
        pageCount={pageCount}
        setCurrentPage={setCurrentPage}
        rows={rows}
        start={startIndex + 1}
        end={lastIndex}
      />
    </div>
  );
}

const TableRowUI = ({
  columns,
  rows,
  loading,
  error,
  onReload,

  columnsToHideOnMobile,
}: IAppTableProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const pushToRoute = (href: string) => {
    router.push(href);
  };
  if (loading) return <TableLoading columnCount={columns.length} />;
  if (error)
    return (
      <tr>
        <td colSpan={columns.length}>
          <GeneralErrorComponent onTryAgain={onReload} />
        </td>
      </tr>
    );

  if (rows.length == 0) {
    return (
      <tr>
        <td colSpan={columns.length}>
          <Box textAlign="center" py={16} px={6}>
            <WarningTwoIcon boxSize={"50px"} color={"orange.300"} />
            <Heading color={"orange.200"} as="h2" size="xl" mt={6} mb={2}>
              No Data
            </Heading>
            <Text color={"gray.500"}>No data available in table</Text>
          </Box>
        </td>
      </tr>
    );
  }
  return rows.map((rowData, index) => (
    <tr
      key={rowData.key}
      className=""
      // onClick={() =>
      //   rowData.href ? pushToRoute(pathname + "/" + rowData.href) : null
      // }
    >
      {rowData.columns.map((column, colIndex) => (
        <td
          className={`px-6 py-4 text-sm text-gray-500 whitespace-nowrap ${getHiddenOnMobileClass(
            colIndex,
            columnsToHideOnMobile
          )}`}
          key={"th-" + index + "-" + colIndex}
        >
          {column}
        </td>
      ))}
    </tr>
  ));
};

export interface IAppTablePaginationProps {
  loading?: boolean;
  error?: string;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  rows: IAppTableRowProps[];
  pageCount: number;
  start: number;
  end: number;
}

export const TablePagination = ({
  loading,
  currentPage,
  pageCount,
  rows,
  start,
  end,
  setCurrentPage,
  error,
}: IAppTablePaginationProps) => {
  const isPrevActive = currentPage > 0;
  const isNextActive = currentPage + 1 < pageCount;
  const prevCss = isPrevActive
    ? "border-teal-500 border text-teal-500 hover:bg-gradient-to-r from-teal-100 to-green-100"
    : " cursor-not-allowed text-gray-300 bg-white border border-gray-300 rounded-s-lg ";

  const nextCss = isNextActive
    ? "border-teal-500 border text-teal-500 hover:bg-gradient-to-r from-teal-100 to-green-100"
    : " cursor-not-allowed text-gray-300 bg-white border border-gray-200 rounded-s-lg";

    if(!pageCount || pageCount <= 1) return <></>
      

  return (
    <nav
      className="flex items-center flex-column flex-wrap md:flex-row justify-between p-4"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {start}-{end}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {rows.length}
        </span>
      </span>
      {pageCount > 1 && (
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <button
              role="button"
              onClick={() => setCurrentPage(currentPage - 1)}
              className={`flex items-center justify-center px-3 h-8  ms-0 leading-tight rounded-l-lg ${prevCss}`}
            >
              Previous
            </button>
          </li>
          {Array.from({ length: pageCount - 1 + 1 }, (_, pageIndex) => {
            const isSelected = currentPage == pageIndex;

            const colorCss = isSelected
              ? "bg-teal-500 text-white border border-teal-300 hover:bg-teal-600"
              : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100";
            return (
              <li key={pageIndex}>
                <button
                  role="button"
                  onClick={() => setCurrentPage(pageIndex)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight ${colorCss}`}
                >
                  {pageIndex + 1}
                </button>
              </li>
            );
          })}
          <li>
            <button
              role="button"
              onClick={() => setCurrentPage(currentPage + 1)}
              className={`flex items-center justify-center px-3 h-8  ms-0 leading-tight rounded-r-lg ${nextCss}`}
            >
              Next
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

type TableLoadingProps = {
  columnCount: number;
};

export enum TableSortOrder {
  asc = "asc",
  desc = "desc",
}

interface ITableHeadingSortButtonProps {
  onToggle: any;
  selected?: TableSortOrder | null;
}
export const TableHeadingSortButton = ({
  onToggle,
  selected,
}: ITableHeadingSortButtonProps) => {
  return (
    <button onClick={onToggle} className="px-2">
      {selected ? (
        <span className="flex flex-col">
          <TriangleUpIcon
            color={selected == TableSortOrder.asc ? "gray" : "black"}
            _hover={{
              color: "green",
              shadow: "lg",
            }}
          />
          <TriangleDownIcon
            color={selected == TableSortOrder.desc ? "gray" : "black"}
            _hover={{
              color: "green",
              shadow: "lg",
            }}
          />
        </span>
      ) : (
        <UpDownIcon
          _hover={{
            color: "green",
            shadow: "lg",
          }}
        />
      )}
    </button>
  );
};
export const TableLoading = ({ columnCount }: TableLoadingProps) => {
  return Array.from({ length: 9 }, (_, currentIndex) => {
    return (
      <tr key={currentIndex} role="status">
        {Array.from({ length: columnCount - 1 + 1 }, (_, columnIndex) => {
          return (
            <td className="px-6 py-4" key={columnIndex + currentIndex}>
              <div className="h-3 animate-pulse bg-gray-300 rounded-full dark:bg-gray-600 w-32 mb-2.5"></div>
            </td>
          );
        })}
      </tr>
    );
  });
};

export default AppTable;
