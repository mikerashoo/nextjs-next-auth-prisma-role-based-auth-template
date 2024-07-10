import { z } from 'zod';
 

// Regular expressions for Ethiopian phone numbers
const ethiopianPhoneNumberRegExp = /^(09|\+2519)\d{8}$/;
 


export const ethiopianPhoneNumberSchema = z.string().regex(
  ethiopianPhoneNumberRegExp,
  {
    message:
      'Invalid Ethiopian phone number format. It should start with "09" or "+2519" followed by 8 digits',
  }
); 


export const fullNameSchema = z.string().regex(/^[a-zA-Z]+( [a-zA-Z]+)*$/, {
  message: 'Invalid fullName. Full name must contain first, middle and lastname',
});

export const userRegistrationSchema = z.object({
  fullName: fullNameSchema,
  phoneNumber: ethiopianPhoneNumberSchema, 
  userName: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

export const userLoginSchema = z.object({
    userName: z.string(),
  password: z.string().min(8),
})