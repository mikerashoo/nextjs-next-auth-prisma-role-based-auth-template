import { z } from "zod"; 

export const branchCreateSchema = z.object({
  name: z.string(),
  address: z.string(),
});
export type IBranchCreateSchema = z.infer<typeof branchCreateSchema>;

 
export const branchUpdateSchema = z.object({
  name: z
    .string() 
    .refine((val) => val, {
      message: "Name is required",
      params: { label: "Branch Name", input: "text" },
    }),
  address: z
  .string() 
    .refine((val) => val, {
      message: "Address is required",
      params: { label: "Branch Address" },
    }),
  status: z
    .enum(["ACTIVE", "IN_ACTIVE"])  
    .optional()
    .refine((val) => val, {
      message: "Status is required",
      params: { label: "Branch Status", input: "switch" },
    }),
});

export type IBranchUpdateSchema = z.infer<typeof branchUpdateSchema>;