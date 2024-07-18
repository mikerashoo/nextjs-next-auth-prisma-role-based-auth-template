import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

export interface IPageHeadingStatics {
  label: string;
  icon: ReactNode;
}
interface IPageHeaderProps {
  title: string;
  statics?: IPageHeadingStatics[];
  actions?: ReactNode[];
  isLoading?: boolean;
}
function PageHeader({ title, actions, statics, isLoading }: IPageHeaderProps) {
  const router = useRouter();

  if (isLoading) return <PageHeaderLoading />;
  return (
    <div className=" px-6 pt-2 pb-4  w-full bg-slate-50 flex flex-col md:flex-row  md:items-end justify-between  border-b ">
      <div className="">
        <h4 className="text-2xl leading-tight text-teal-500 font-extrabold">
          <ArrowBackIcon onClick={() => router.back()} /> {title}
        </h4>
        
            {statics && (
              <ul
                aria-label="current Status"
                className="flex flex-row flex-wrap w-full h-full items-start gap-4 justify-start text-gray-600 dark:text-gray-400 text-sm mt-3"
              >
                {statics.map((stat) => (
                  <li
                    key={stat.label}
                    className="flex items-center flex-row justify-center gap-1"
                  >
                    {stat.icon}
                    <span>{stat.label}</span>
                  </li>
                ))}
              </ul>
            )} 
        
      </div>
      {actions && actions.length > 0 && (
        <div className="mt-6 md:mt-0 flex flex-col gap-2">
          {...actions ?? []}
        </div>
      )}
    </div>
  );
}

function PageHeaderLoading() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-row gap-2  animate-pulse">
      <div className="w-1/2 h-8 bg-gray-300 rounded"></div>
      <div className="w-1/2 h-8 bg-gray-300 rounded"></div>
    </div>
  );
}

export default PageHeader;
