import { ZodSchema, z } from "zod";

export enum InputType {
  Email = "email",
  Hidden = "hidden",
  Password = "password",
  Text = "text",
  Tel = "tel",
  Radio = "radio",
  Switch = "switch",
  Select = "select",
  DatePicker = "datePicker",
}

export interface IInputOption {
  label: string;
  value: any;
  customProps?: {
    [key: string]: any;
  };
}

export interface ISchemaInputProps {
  name: string;
  label: string;
  value?: any;
  inputType: InputType;
  options?: IInputOption[] | [];
}

export interface IAppFormSchemaInputs {
  schema: z.ZodObject<any>;
  inputs: ISchemaInputProps[];
}
