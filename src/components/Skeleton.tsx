import React from 'react'
import SkeletonCard from './SkeletonCard'

const Skeleton = () => {
  return (
    <div className='grid grid-cols-4 gap-3 sm:grid-cols-2 md:grid-cols-3 mt-8'>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  )
}

export default Skeleton
