 
import { TicketStatus } from "@/utils/shared/shared-types/prisma-enums";
import { Text, Tag, TagLabel, Heading } from "@chakra-ui/react";
import React from "react";

interface IStatusColorSchema {
  baseColor?: string;
  textColor?: string;
  bgColor?: string;
  borderColor?: string;
  label: string;
}

const getStatusColor = (status: TicketStatus | 'string'): IStatusColorSchema => {
  let label = '';
  let baseColor = null;
  let bgColor = null;
  let borderColor = null;
  let textColor = null;
  switch (status) {
    case TicketStatus.WIN:
      baseColor = "teal";
      label = 'Winner';
      bgColor = "teal-600";
      borderColor = "border-teal-600";
      textColor = "text-teal-600";
      break;
    case TicketStatus.PAID:
      baseColor = "green";
      label = 'Paid';

      bgColor = "green-600";
      borderColor = "border-green-600";
      textColor = "text-green-600";
      break;
    case TicketStatus.LOSE:
      label = 'Loser';

      baseColor = "orange";
      bgColor = "orange-600";
      borderColor = "border-orange-600";
      textColor = "text-orange-500";
      break;
    case TicketStatus.CANCELLED:
      label = 'Cancelled';

      baseColor = "red";
      bgColor = "red";
      borderColor = "border-red-500";
      textColor = "text-red-500";
      break;
    case TicketStatus.ON_PLAY:
      label = 'Waiting';

      baseColor = "orange";
      bgColor = "orange-500";
      borderColor = "border-orange-500";
      textColor = "text-orange-500";
      break;
    default:
      break;
  }

  return {
    label,
    baseColor,
    bgColor,
    borderColor,
    textColor
  };
};
function TicketStatusTag(props: { status: TicketStatus }) {
  
  const status = props.status;
  const colorSchema = getStatusColor(status);


  return (
    <Text
    rounded={"lg"}
    size={"md"}
    className={status == TicketStatus.CANCELLED && "line-through"}
    fontWeight={"bold"} 
    color={colorSchema.baseColor}
  >
    {colorSchema.label}
  </Text>
  ) 
}

export function TicketStatusStamp(props: { status: TicketStatus }) {
  const status = props.status;

  const colorSchema = getStatusColor(status);
 

  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-0 ">
      <div
        className={`relative  flex justify-center items-center w-[240px] h-[240px]  border-double border-[12px] shadow-lg  rounded-full ${colorSchema.borderColor}`}
      >
        <div
          className={`z-20[12px] border-double -rotate-45 absolute -left-8 -right-8 text-center items-center shadow-lg rounded-sm  ${colorSchema.borderColor}`}
        >
          <Heading size={'lg'} textTransform={'uppercase'}  color={colorSchema.baseColor}>{colorSchema.label}</Heading>
        </div>
      </div>
    </div>
  );
}

export default TicketStatusTag;
