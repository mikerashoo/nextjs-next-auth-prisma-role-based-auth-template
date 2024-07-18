import PageHeader from '@/components/ui-components/PageHeader';
import { useShopDetailContext } from '@/contexts/shop-contexts/ShopDetailContext'; 
import { ActiveStatus } from '@/utils/shared/shared-types/prisma-enums';
import { ArrowBackIcon, CalendarIcon } from '@chakra-ui/icons';
import { MapIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function ShopDetailHeader() {
    const {
        shop,
        loading, 
    } = useShopDetailContext(); 
  if(loading) <ReportHeaderLoading />

  const {address, name} = shop;
  return (
    <PageHeader
    title={name + ' ' + 'detail'}
  
    
    statics={[
      {
        label:  address,
        icon: <MapIcon width={16} />,
      },
      {
        label: shop.status == ActiveStatus.ACTIVE ? "Active" : "Disabled",
        icon: <div
          className={`h-2.5 w-2.5 rounded-full ${
            shop.status == ActiveStatus.ACTIVE
              ? "bg-green-500"
              : "bg-red-500"
          } me-2`}
        ></div>,
      },

      {
        label:
        new Date(shop.createdAt).toLocaleString(),
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
