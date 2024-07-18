import { UserRole } from "../shared/shared-types/prisma-enums";

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

  export const getFullNameForAgent = (user: any): string => {
     
    if(!user) return '-';
    const name = `${user.firstName} ${user.lastName}`;
    return `${name} ${user.role && user.role == UserRole.SUPER_AGENT ? '🔥' : ''}`
  }
  export const getAgentSuperAgent = (agent: any): string => {
    if(!agent) return '-';

    const isUserSuperAgent = agent.role && agent.role == UserRole.SUPER_AGENT;
    if(isUserSuperAgent) return getFullNameForAgent(agent)
    return `${getFullNameForAgent(agent)} / ${agent.superAgent ? getFullNameForAgent(agent.superAgent) : isUserSuperAgent ? getFullNameForAgent(agent) : '-'}`

 
  }