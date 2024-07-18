import FilterByPeriodCombo from "@/components/date-filter/FilterByPeriodCombo";
import { useCommonReportContext } from "@/contexts/ReportContext";
import {
  useColorModeValue,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Heading,
} from "@chakra-ui/react";
import { TicketIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import { GiMoneyStack } from "react-icons/gi";
import DonutChart, { ChartColor, IDonutChartValue } from "./Charts";
import { filterPeriods } from "@/utils/report-hepers";
import { DollarSignIcon } from "lucide-react";

function CommonReportSummary({noChart} : {noChart?: boolean}) {
  const { report, onPeriodChange, loading } = useCommonReportContext();

  const [periodLabel, setPeriodLabel] = useState(filterPeriods[0].label);
  const {
    cash: {
      netCash,
      remainingCash,
      totalMoneyCollected,
      totalMoneyPaid,
      totalMoneyToBePaid,
    },
    ticket: {
      activeCount,
      cancelledCount,
      loserCount,
      paidCount,
      totalCount,
      winnerCount,
    },
  } = report;

  const topBoxBg = useColorModeValue("gray.50", "gray.900");
  const bottomBoxBG = useColorModeValue("gray.800", "white");
  let totalWinning = winnerCount + paidCount;

  const getPercentFromTotalTicket = (amount: number) => {
    let _percent = totalCount == 0 ? 0 : (amount / totalCount) * 100;
    return _percent + "%";
  };

  const getWinnerPercentage = (
    amount: number
  ): {
    percent: number;
    arrowType: any;
  } => {
    let percent = totalWinning == 0 ? 0 : (amount / totalWinning) * 100;
    let arrowType = percent > 50 ? "increase" : "decrease";
    return {
      arrowType,
      percent,
    };
  };

  const paidPercent = getWinnerPercentage(paidCount);
  const toBeClaimed = getWinnerPercentage(totalMoneyPaid);

  const cashReportChartStatics: IDonutChartValue[] = [
    {
      label: "Paid",
      value: totalMoneyPaid,
      color: ChartColor.Orange,
    },
    {
      label: "To Be Paid",
      value: totalMoneyToBePaid,
      color: ChartColor.Red,
    },
    {
      label: "Remaining Cash",
      value: remainingCash,
      color: ChartColor.Teal,
    },
    {
      label: "Net",
      value: netCash,
      color: ChartColor.Green,
    },
  ];

  const ticketStaticsForChart: IDonutChartValue[] = [
    {
      label: "Active",
      value: activeCount,
      color: ChartColor.Gray,
    },
    {
      label: "Cancelled",
      value: loserCount,
      color: ChartColor.Red,
    },
    {
      label: "Losers",
      value: loserCount,
      color: ChartColor.Orange,
    },
    {
      label: "Winners",
      value: paidCount + winnerCount,
      color: ChartColor.Yellow,
    },
  ];

  const winningTicketStaticsForChart: IDonutChartValue[] = [
    {
      label: "Paid",
      value: paidCount,
      color: ChartColor.Green,
    },
    {
      label: "To Be Claimed",
      value: winnerCount,
      color: ChartColor.Red,
    },
  ];
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      {
        !noChart &&    <FilterByPeriodCombo
        loading={loading}
          onValuesChange={(values) => {
            onPeriodChange(values);
          }}
          onPeriodLabelChange={setPeriodLabel}
        />
      }
   

      

      <div className="flex flex-col w-full gap-4">
        <DonutChart
        suffix="Birr"
        noChart={noChart}
        icon={<DollarSignIcon />}
        loading={loading}
          statics={cashReportChartStatics}
          totalInfo={{
            title: "Cash Collected",
            value: totalMoneyCollected,
          }}
        />
        <DonutChart
        loading={loading} 
        noChart={noChart}

          statics={ticketStaticsForChart}
          totalInfo={{
            title: "Tickets",
            value: totalCount,
          }}
        />

        <DonutChart
        loading={loading} 
        noChart={noChart}

          statics={winningTicketStaticsForChart}
          totalInfo={{
            title: "Winning Tickets",
            value: totalWinning,
          }}
        />
      </div>
    </div>
  );
}

export function CashStatCard({
  title,
  value,
  description,
  color,
  suffix
}: {
  title: any;
  value: any;
  description?: any;
  suffix?: any;
  color?: string;
}) {
  const emerald = "#10b981";
  const borderColor = color ? "border-" + color + "-500" : "border-emerald-500";
  const textColor = color ? "text-" + color + "-500" : "text-emerald-500";
  return (
    <Stat className={`border rounded-md md:border-0 md:rounded-none bg-transparent ${color ? textColor : ''}  w-full  p-2`}>
      <StatNumber className={``}>{`${value} ${suffix}`}</StatNumber>

      <StatLabel fontWeight={"bold"}>{title}</StatLabel>
      <StatHelpText>{description} </StatHelpText>
    </Stat>
  );
}

export default CommonReportSummary;
