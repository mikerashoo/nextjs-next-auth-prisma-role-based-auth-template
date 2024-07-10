 
import { getValues } from "@/utils/common-hepers";
import { GameType } from "@/utils/prisma-enums";
import { z } from "zod"; 

// provider schemas
export const ticketReportSchema = z.object({
  branchIds: z.array(z.string()).optional().nullable(),
  cashierIds: z.array(z.string()).optional().nullable(),
  startAt: z.string().optional().nullable(),
  endAt: z.string().optional().nullable(),
  gameTypes: z.array(z.enum(getValues(GameType))).optional().nullable(),
});

export type ITicketReportFilterSchema = z.infer<typeof ticketReportSchema>;
