import { nativeEnum } from "zod";

export const GENERAL_ERROR_MESSAGE = "Something Went Wrong."

export function capitalizeFirst(s)
{
    return s[0].toUpperCase() + s.slice(1);
}

export function toArray(myEnum: any) : string[] {
    return Object.values(myEnum);
}