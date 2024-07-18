import ShopDetailHome from '@/components/provider-components/shops/detail'
import { ShopDetailProvider } from '@/contexts/shop-contexts/ShopDetailContext'
import { useRouter } from 'next/router'
import React from 'react'

function ShopDetail() {
    const router = useRouter() 
  return (
    <ShopDetailProvider shopIdentifier={router.query.shopIdentifier.toString()}>
      
      <ShopDetailHome />
    </ShopDetailProvider>
  )
}

export default ShopDetail