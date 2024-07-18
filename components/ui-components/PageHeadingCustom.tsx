import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { useProviderSuperAgentDetailContext } from "@/contexts/super-agents/details/ProviderSuperAgentDetailContext";
import { getFullName } from "@/utils/common-hepers";
import { Button, Collapse, IconButton, useDisclosure } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { ArrowBackIcon } from "@chakra-ui/icons";

export interface IPageHeadingStatics {
  label: any;
  icon?: ReactNode;
}
interface IPageHeaderProps {
  title: string;
  statics?: IPageHeadingStatics[];
  actions?: ReactNode[];
  isLoading?: boolean;
}
function PageHeadingCustom({
  title,
  actions,
  statics,
  isLoading,
}: IPageHeaderProps) {
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: false,
  });

  const router = useRouter();
  return (
    <header className="bg-gray-50 py-2 ">
      <div className="mx-auto w-full px-2   xl:flex xl:items-center xl:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="mt-2 text-2xl font-bold flex justify-between items-center leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          <span><ArrowBackIcon onClick={() => router.back()}/> {title}{" "}</span>
            <div className="flex  md:hidden">
                
                <Button variant={'outline'} rounded={'lg'} onClick={onToggle}> Profile { isOpen ? <ChevronUpIcon width={12} /> : <ChevronDownIcon  width={12} />} </Button>
             
            </div>
          </h1>
          <Collapse in={isOpen} animateOpacity>
            {statics && (
              <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-8">
                {statics.map((stat) => (
                  <div
                    key={stat.label}
                    className="mt-2 flex gap-2 items-center text-sm text-gray-500"
                  >
                    {stat.icon}
                    {stat.label}
                  </div>
                ))}
              </div>
            )}
          </Collapse>
        </div>
        {actions && actions.length > 0 && (
          <Collapse in={isOpen} animateOpacity>
            <div className="mt-5 flex xl:mt-0 xl:ml-4 gap-2">
              {actions.map((action) => action)}
            </div>
          </Collapse>
        )}
      </div>
    </header>
  );
}

export default PageHeadingCustom;
