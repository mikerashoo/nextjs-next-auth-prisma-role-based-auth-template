export function capitalizeFirst(s)
{
    return s[0].toUpperCase() + s.slice(1);
}

// lib/enum.ts
export function getValues<T extends Record<string, any>>(obj: T) {
    return Object.values(obj) as [(typeof obj)[keyof T]]
  }

  export const getFullName = (user: any) => {
    return `${user.firstName} ${user.lastName}`;
  }