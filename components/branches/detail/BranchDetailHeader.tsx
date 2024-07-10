import PageHeader from '@/components/ui-components/PageHeader';
import { useBranchDetailContext } from '@/contexts/branch-contexts/BranchDetailContext';
import { ActiveStatus } from '@/lib/enums';
import { ArrowBackIcon, CalendarIcon } from '@chakra-ui/icons';
import { Tab, TabList, TabGroup } from '@headlessui/react';
import { MapIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function BranchDetailHeader() {
    const {
        branch,
        loading,
        tabContents,
        selectedTab,
        setSelectedTab,
        error,
        reload
    } = useBranchDetailContext();
  const router = useRouter();
  if(loading) <ReportHeaderLoading />

  const {address, name, status, createdAt, cashiers} = branch;
  return (
    <PageHeader
    title={name + ' ' + 'detail'}
  
    
    statics={[
      {
        label:  address,
        icon: <MapIcon width={16} />,
      },
      {
        label: branch.status == ActiveStatus.ACTIVE ? "Active" : "Disabled",
        icon: <div
          className={`h-2.5 w-2.5 rounded-full ${
            branch.status == ActiveStatus.ACTIVE
              ? "bg-green-500"
              : "bg-red-500"
          } me-2`}
        ></div>,
      },

      {
        label:
        new Date(branch.createdAt).toLocaleString(),
        icon: <CalendarIcon />,
      },
    ]}
    actions={[
     
    ]}
  />
  );
}

function ReportHeaderLoading() {
  return (
    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
  );
}
