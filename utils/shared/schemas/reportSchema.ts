import { z } from "zod";
import { GameType } from "../shared-types/prisma-enums"; 
import { getValues } from "@/utils/common-hepers";
 
// provider schemas
export const ticketReportSchema = z.object({
  branchIds: z.array(z.string()).optional().nullable(),
  cashierIds: z.array(z.string()).optional().nullable(),
  startAt: z.string().optional().nullable(),
  endAt: z.string().optional().nullable(),
  gameTypes: z.array(z.enum(getValues(GameType))).optional().nullable(),
});

export type ITicketReportFilterSchema = z.infer<typeof ticketReportSchema>;


export const providerCommonQuerySchema = z.object({
  superAgentId: z.string().optional().nullable(), 
  agentId: z.string().optional().nullable(), 
  branchId: z.string().optional().nullable(), 
  cashierId: z.string().optional().nullable(), 
});

export type IProviderCommonQuerySchema = z.infer<typeof providerCommonQuerySchema>;


export const basicReportSchema = providerCommonQuerySchema.extend({
  startAt: z.string().optional().nullable(),
  endAt: z.string().optional().nullable(),  
});

export type IBasicReportSchema = z.infer<typeof basicReportSchema>;
