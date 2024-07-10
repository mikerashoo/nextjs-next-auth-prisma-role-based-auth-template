 
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react'

export interface IPageHeadingStatics {
    label: string;
    icon: ReactNode
}
interface IPageHeaderProps {
    title: string;
    statics?: IPageHeadingStatics[];
    actions?: ReactNode[]
}
function PageHeader({title, actions, statics} :IPageHeaderProps) {
    const router = useRouter();
  return (
    <div className="mb-2 lg:mb-4 container px-6 pt-2 pb-4  w-full bg-slate-50 flex flex-col md:flex-row items-center md:items-end justify-between  border-b border-gray-300">
    <div>
      <h4 className="text-2xl leading-tight text-teal-500 font-extrabold">
        <ArrowBackIcon onClick={()=>router.back()} /> {title}
      </h4>
      {
        statics && (
            <ul
            aria-label="current Status"
            className="flex flex-row flex-wrap w-full h-full items-start gap-4 justify-start text-gray-600 dark:text-gray-400 text-sm mt-3"
          >
            {
                statics.map((stat) =>   <li key={stat.label} className="flex items-center justify-center gap-1">
                     {stat.icon}
                    <span>{stat.label}</span>
                  </li>)
            }
           
          </ul>
        )
      }
     
    </div>
    <div className="mt-6 md:mt-0 flex flex-col gap-2">
        {
            ...(actions ?? [])
        }
    </div>
  </div>
  )
}

export default PageHeader