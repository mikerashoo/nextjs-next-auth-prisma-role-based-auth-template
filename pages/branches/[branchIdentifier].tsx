import BranchDetailHome from '@/components/provider-components/branches/detail'
import { BranchDetailProvider } from '@/contexts/branch-contexts/BranchDetailContext'
import { useRouter } from 'next/router'
import React from 'react'

function BranchDetail() {
    const router = useRouter() 
  return (
    <BranchDetailProvider branchIdentifier={router.query.branchIdentifier.toString()}>
      
      <BranchDetailHome />
    </BranchDetailProvider>
  )
}

export default BranchDetail