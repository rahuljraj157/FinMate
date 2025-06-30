"use client"
import dynamic from 'next/dynamic'
import React from 'react'

const LoadingAnimation = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-green-500"></div>
  </div>
);

const page = () => {


  const Lazycomponent=dynamic(()=>import("../../../components/Transactions"),{
    loading:()=><LoadingAnimation/>,
    ssr:false
  })
  return (
    <div>
      <Lazycomponent/>
    </div>
  )
}

export default page
