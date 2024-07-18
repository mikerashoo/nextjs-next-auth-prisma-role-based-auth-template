import GeneralErrorComponent from "@/components/common/GeneralErrorComponent";
import CardLoading from "@/components/common/loaders/CardLoading";
import { useShopCashiersContext } from "@/contexts/shop-contexts/ShopCashierContext";
import { useShopReportContext } from "@/contexts/shop-contexts/ShopReportContext";
import { getFullName } from "@/utils/common-hepers";
import { CheckIcon } from "@chakra-ui/icons";
import {
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Stack,
  Box,
  Text,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
} from "@chakra-ui/react";
import {
  PlusCircleIcon,
  MinusCircleIcon,
  BellAlertIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/20/solid";
import React, { ReactNode } from "react";

function ShopReportSummaryBox() {
  const { loading, error, report, currentFilter } = useShopReportContext();

  const {
    remainingCash,
    tickets,
    totalMoneyCollected,
    totalMoneyPaid,
    totalMoneyToBePaid,
    totalTickets,
    totalTicketsCancelled,
  } = report;

  const topBoxBg = useColorModeValue("gray.50", "gray.900");
  const bottomBoxBG = useColorModeValue("gray.800", "white");

  return (
    <Box
      className="h-full w-full md:max-w-sm"
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"md"}
      rounded={"md"}
      overflow={"hidden"}
    >
      {loading ? (
        <CardLoading />
      ) : error ? (
        <GeneralErrorComponent />
      ) : (
        <>
          <Box
            px={{
              base: 2,
              md: 6,
            }}
            py={{
              base: 4,
              md: 10,
            }}
            bg={topBoxBg}
          >
            <List spacing={3}>
              <ListItem color="green.500">
                <ListIcon
                  as={PlusCircleIcon}
                  textColor={"green.500"}
                  color="green.500"
                />
                <Text as={"span"} fontWeight={"bold"} color="green.500">
                  Total Collected: {totalMoneyCollected} birr
                </Text>{" "}
              </ListItem>

              <ListItem color="red.500">
                <ListIcon
                  as={MinusCircleIcon}
                  textColor={"red.400"}
                  color="red.400"
                />
                <Text as={"span"} fontWeight={"bold"} color="red.500">
                  Total Paid: {totalMoneyPaid} birr
                </Text>{" "}
              </ListItem>

              <ListItem color="green.500">
                <ListIcon
                  as={ArchiveBoxIcon}
                  textColor={"green.400"}
                  color="green.400"
                />
                <Text as={"span"} fontWeight={"bold"} color="green.400">
                  Remaining Cash: {totalMoneyCollected - totalMoneyPaid} birr
                </Text>{" "}
              </ListItem>

              <ListItem color="orange.400">
                <ListIcon
                  as={BellAlertIcon}
                  textColor={"orange.400"}
                  color="orange.400"
                />
                <Text as={"span"} fontWeight={"bold"} color="orange.400">
                  Waiting To Be Paid: {totalMoneyToBePaid} birr
                </Text>{" "}
              </ListItem>

              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                {totalTickets} Tickets
              </ListItem>

              <ListItem>
                <ListIcon
                  as={CheckIcon}
                  textColor={"red.500"}
                  color="red.400"
                />
                {totalTicketsCancelled} Cancelled Tickets
              </ListItem>
            </List>
          </Box>
          <Stack
            textAlign={"center"}
            p={{ base: 2, md: 6 }}
            color={bottomBoxBG}
            align={"center"}
          >
            <Stack direction={"row"} align={"center"} justify={"center"}>
              <Text>Net</Text>
              <Text
                fontSize={{ base: "4xl", md: "6xl" }}
                color={"green.500"}
                fontWeight={800}
              >
                {totalMoneyCollected - totalMoneyPaid - totalMoneyToBePaid}
              </Text>
              <Text color={"gray.500"}>birr</Text>
            </Stack>
          </Stack>
        </>
      )}
    </Box>
  );
}

export function CurrentReportFilterHeader() {
  const { loading, error, report, currentFilter } = useShopReportContext();
  const { cashiers } = useShopCashiersContext();

  const headingBg = useColorModeValue("gray.50", "gray.800");

  if (loading) return <CardLoading />;
  return (
    <Box w={'full'} bg={headingBg} p={4} rounded={'lg'} gap={2}>
      <Heading size={'md'}>Reports of:</Heading> 
    
      <StatGroup >
        <Stat className="">
          <StatLabel>Period</StatLabel>
          <StatNumber fontSize={18}>{currentFilter.period}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Cashier</StatLabel>
          <StatNumber fontSize={18}>
            {currentFilter.cashier &&
            cashiers.find((cs) => cs.id == currentFilter.cashier)
              ? getFullName(
                  cashiers.find((cs) => cs.id == currentFilter.cashier)
                )
              : "All"}
          </StatNumber>
        </Stat>

        <Stat>
          <StatLabel>Game Type</StatLabel>
          <StatNumber fontSize={18}>
            {currentFilter.gameType
              ? currentFilter.gameType.replace("_", " ")
              : "All"}
          </StatNumber>
        </Stat>
      </StatGroup> 
    </Box>

  );
}

interface IStatCardProps {
  title: string;
  value: string;
  color?: string;
  icon?: ReactNode;
}

export function StatCard({ title, value, color, icon }: IStatCardProps) {
  return (
    <div className="flex flex-row items-center gap-2 h-fit w-full lg:w-full px-4 py-2">
      {icon && (
        <Box
          h={"full"}
          p={2}
          rounded={"lg"}
          bg={color}
          color={"white"}
          className="text-white text-4xl"
        >
          {icon}
        </Box>
      )}
      <div className="flex flex-col">
        <p> {title} </p>

        <Heading size={"md"}>{value}</Heading>
      </div>
    </div>
  );
}
export default ShopReportSummaryBox;
