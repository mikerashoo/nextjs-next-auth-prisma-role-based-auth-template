import { ITicketWithDetail } from "@/utils/shared/shared-types/ticketModels";
import React, { useState } from "react";
import AppModal from "../ui-components/modals/AppModal";
import { useBranchDetailContext } from "@/contexts/branch-contexts/BranchDetailContext";
import { HeadlessButton } from "../ui-components/AppButton";
import { InfoIcon } from "@chakra-ui/icons";
import { Br, Cut, Line, Printer, Text, Row } from "react-thermal-printer";
import TicketStatusTag from "./TicketStatusTag";

interface ITicketDetailModalProps {
  ticket: ITicketWithDetail;
}
function TicketDetailModal({ ticket }: ITicketDetailModalProps) {
  const { setLoading, error, loading, reload } = useBranchDetailContext();

  const [hideModal, setHideModal] = useState<boolean>(true);

  return (
    <div>
      <AppModal
        loading={loading}
        title={ticket.uniqueId + " detail"}
        hideModal={hideModal}
        toggleButton={
          <HeadlessButton
            status={0}
            className="font-semibold"
          >
            <InfoIcon /> Detail
          </HeadlessButton>
        }
      >
        <Printer type="epson">
          <Text
            className="font-extrabold"
            bold={true}
            size={{ width: 2, height: 2 }}
          >
            ID: {ticket.uniqueId}
          </Text>
          <Text size={{ width: 2, height: 2 }}>
            Branch: {ticket.game.branch.name}
          </Text>
          <Text size={{ width: 2, height: 2 }}>
            Cashier: {ticket.cashier.userName}
          </Text>
          <Text size={{ width: 2, height: 2 }}>
            Game Type: {ticket.game.gameType}
          </Text>
          <Text size={{ width: 2, height: 2 }}>
            Game Id: {ticket.game.uniqueId}
          </Text>
          <Row
            left="Created at:"
            className="flex italic gap-4"
            right={new Date(ticket.createdAt).toLocaleString()}
          />

          <Br />
          <Line />
          
          <Row
            left="Total Bet: "
            className="flex gap-4"
            right={ticket.totalBetAmount.toString() + " birr"}
          />
          <Row
            left="Possible Win: "
            className="flex gap-4"
            right={ticket.possibleWinAmount.toString() + " birr"}
          />
          <Row
            left="Won: "
            className="flex gap-4"
            right={
              ticket.winAmount && ticket.winAmount > 0
                ? ticket.winAmount.toString() + " birr"
                : "-"
            }
          />
          <Row
            left="Status:"
            className="flex gap-4"
            right={<TicketStatusTag status={ticket.status} />}
          />
  <Br />

          <Line /> 

          <Text className="font-extrabold">Selections</Text>
 

          {ticket.kenoTicket.selections.map((sl, index) => (
            <span className="py-2" key={sl.id}>
            

              <Row
                left={"Selection #" + (index + 1)}
                className="flex gap-4"
                right={
                  <span className="text-space-4">
                    {sl.selectedNumbers.toLocaleString()}{" "}
                  </span>
                }
              />
              <Row
                left="Bet: "
                className="flex gap-4"
                right={sl.betAmount.toString() + " birr"}
              />
              <Row
                left="To Win: "
                className="flex gap-4"
                right={sl.possibleWinAmount.toString() + " birr"}
              />
              <Row
                left="Won: "
                className="flex gap-4"
                right={
                  sl.winAmount && sl.winAmount > 0
                    ? sl.winAmount.toString() + " birr"
                    : "-"
                }
              />
              <Line />
              <Br />

            </span>
          ))}

         

          {ticket.status == "PAID" && ticket.payment && (
            <> 
              <Text
                className="font-extrabold"
                bold={true}
                size={{ width: 2, height: 2 }}
              >
                Payment Info
              </Text>

              <Row
                left="Paid: "
                className="flex gap-4"
                right={ticket.payment?.paidAmount + " birr"}
              />
              <Row
                left="Paid By: "
                className="flex gap-4"
                right={ticket.payment?.cashier.userName}
              />
              <Row
                left="Created at:"
                className="flex italic gap-4"
                right={new Date(ticket.payment.createdAt).toLocaleString()}
              />
            </>
          )}
          <Cut />
        </Printer>
      </AppModal>
    </div>
  );
}

export default TicketDetailModal;
