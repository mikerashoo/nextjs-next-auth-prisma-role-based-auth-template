import TableLoading from "@/components/common/loaders/TableLoading";
import TicketDetailModal from "@/components/tickets/TicketDetailModal";
import TicketStatusTag from "@/components/tickets/TicketStatusTag";
import AppTable, {
  IAppTableRowProps,
} from "@/components/ui-components/AppTable";
import SelectComboBox from "@/components/ui-components/SelectComboBox";
import { useCommonReportContext } from "@/contexts/ReportContext";
import { TicketStatus, GameType } from "@/utils/shared/shared-types/prisma-enums";
import { ITicketWithDetail } from "@/utils/shared/shared-types/ticketModels";
import { SearchIcon } from "@chakra-ui/icons";
import {
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface ITicketSummaryFilter {
  gameType?: GameType;
  cashier?: string;
  status?: TicketStatus;
}

export default function CommonReportTable({tickets}: {tickets: ITicketWithDetail[]}) {
  const { report, loading, error, reload, filterLabel } =
    useCommonReportContext(); 
 
  const [ticketsToShow, setTicketsToShow] = useState<ITicketWithDetail[]>([]); 

  useEffect(() => {
   setTicketsToShow(tickets)
  }, [tickets])
  
  const columns = ["ID", "Status", "Bet Amount", "Win Amount", "Detail"];
 

  const rows: IAppTableRowProps[] = ticketsToShow.map((ticket) => {
    return {
      key: ticket.id.slice(5),
      columns: [
        ticket.uniqueId,
        <TicketStatusTag
          key={"status" + ticket.id.slice(4)}
          status={ticket.status as TicketStatus}
        />,
        ticket.totalBetAmount, 
        ticket.winAmount && ticket.winAmount > 0 ? ticket.winAmount : "-",
 
          <TicketDetailModal  key={ticket.id + "action"} ticket={ticket} />
 
      ],
    };
  });

  if (loading) return <TableLoading columnsCount={6} />;

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <AppTable
        caption={{
          title: "Tickets",
          extra: (
            <div className="w-full flex flex-col md:flex-row gap-4 justify-between">
              <InputGroup className="max-w-md">
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  onChange={(e) =>
                    setTicketsToShow(
                      e.target.value.trim().length == 0 ? tickets : tickets.filter((ticket) =>
                        ticket.uniqueId
                          .toLowerCase()
                          .includes(e.target.value.toLowerCase())
                      )
                    )
                  }
                  type="text"
                  placeholder="Search Ticket"
                />
              </InputGroup>

            
              
              <SelectComboBox 
                options={Object.keys(TicketStatus).map((ticketStatus) => {
                  return {
                    label: ticketStatus.toString().replace("_", " "),
                    value: ticketStatus,
                  };
                })}
                placeHolder="All Status"
                onSelect={(selected) => {
                  console.log("Selected ", selected)
                  const newFilter = selected ? tickets.filter(tk => tk.status == selected) :  tickets;
                  setTicketsToShow(newFilter);
                }}
                key="Status"
              />
            </div>
          ),
        }}
        loading={loading}
        error={error}
        columns={columns}
        rows={rows}
        columnsToHideOnMobile={[1, 2, 3]}
        itemsPerPage={5}
      />
    </div>
  );
}
