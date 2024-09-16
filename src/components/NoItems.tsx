import { File } from 'lucide-react'
import React from 'react'

const NoItems = () => {
  return (
    <div className='flex flex-col w-full h-screen justify-center -mt-20 items-center'>
      <div className='flex bg-primary/10 flex-col justify-center items-center rounded-2xl h-20 w-20'>
        <File size={60} className='text-red-600' />
      </div>
      <h2 className='text-sm font-bold'>No listing found for this categories</h2>
      <p className='text-[0.7rem]'>please check other categories or create your own listing</p>
    </div>
  )
}

export default NoItems
