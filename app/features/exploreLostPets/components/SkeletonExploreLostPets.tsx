import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const SkeletonExploreLostPets = () => {
  return (
    <div className="flex flex-col">
      <Separator />
      {Array(3)
        .fill(null)
        .map((_, index) => (
          <React.Fragment key={index}>
            <div className="grid items-center gap-4 px-4 py-5 md:grid-cols-6">
              <div className="order-2 flex items-center gap-2 md:order-none md:col-span-2">

                <span className="flex mr-2 h-20 w-22 shrink-0 items-center justify-center rounded-md bg-muted">
                  <Skeleton className="h-full w-full rounded-md" />
                </span>
                <div className="flex flex-col w-full">

                  <Skeleton className="h-5 w-3/4 mb-2" />

                  <Skeleton className="h-4 w-1/2 mb-1" />

                  <Skeleton className="h-4 w-1/3" />
                </div>
              </div>

              <div className="flex flex-row items-center gap-4 md:order-none md:col-span-3">
                <Skeleton className="h-6 w-6" />
                <Skeleton className="h-5 w-full" />
              </div>

              <div className="order-3 ml-auto w-fit gap-2 md:order-none">
                <Skeleton className="h-8 w-20 rounded-md" />
              </div>
            </div>
            <Separator />
          </React.Fragment>
        ))}
    </div>
  )
}

export default SkeletonExploreLostPets