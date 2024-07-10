import { z } from 'zod';
import { userRegistrationSchema } from './userSchemas';
 

const identifierSchema = z.string().regex(/^[a-z-]+$/, {
  message: 'Invalid identifier. Value must be all lowercase with no spaces, and can include "-" character.',
});
 

 
export const providerCreateSchema = z.object({
  name: z.string(),
  address: z.string(), 
  identifier: identifierSchema,  
});
 
export const providerByIdentifierSchema = z.object({
  identifier: z.string(), 
});
 

export const providerAdminSchema = userRegistrationSchema.extend({
  providerId: z.string().min(5),
})