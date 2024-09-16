import { categoryItems } from '@/lib/CategoriesItems'
import Image from 'next/image'
import React from 'react'

const CategoryShowCase = ({category }:{category:string}) => {
    const getCategory = categoryItems.find((item)=>{
        return item.name === category
    })
  return (
    <div className='flex gap-3 items-center'>
      <Image 
      src={getCategory?.imageUrl as string}
      alt={getCategory?.name as string}
      width={40}
      height={40}
      className='w-12 h-12'
      />
      <div>
        <h1 className='text-[0.8rem] font-semibold'>{getCategory?.name}</h1>
        <h1 className='text-[0.6rem] font-semibold'>{getCategory?.description}</h1>
      </div>
    </div>
  )
}

export default CategoryShowCase
