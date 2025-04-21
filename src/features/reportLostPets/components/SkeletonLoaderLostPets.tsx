import { Skeleton } from '@/components/ui/skeleton'

const SkeletonLoader = () => (
  <div className="flex flex-col gap-4 py-15 mx-10 lg:mx-15">
    <Skeleton className="w-[200px] h-[35px] mb-2" />
    <Skeleton className="w-[300px] h-[25px]" />
    <div className="grid gap-4 mt-4">
      {/*  1 skeleton for small screens */}
      <div className="sm:block md:hidden">
        <div className="flex flex-col items-center gap-2 w-15/16 h-[300px] bg-gray-300 rounded-md animate-pulse">
          <Skeleton className="h-[210px] w-full bg-gray-200 rounded-md" />
          <Skeleton className="h-4 w-3/4 rounded-md mx-auto mt-3" />
          <Skeleton className="h-4 w-1/2 rounded-md mx-auto" />
        </div>
      </div>
      {/* 2 skeletons for medium screens */}
      <div className="hidden md:grid md:grid-cols-2 gap-4 lg:hidden">
        {Array(2)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 w-full h-[300px] bg-gray-300 rounded-md animate-pulse"
            >
              <Skeleton className="h-[210px] w-full bg-gray-200 rounded-md" />
              <Skeleton className="h-4 w-3/4 rounded-md mx-auto mt-3" />
              <Skeleton className="h-4 w-1/2 rounded-md mx-auto" />
            </div>
          ))}
      </div>
      {/* 3 skeletons for medium and large screens */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-4">
        {Array(3)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 w-full h-[300px] bg-gray-300 rounded-md animate-pulse"
            >
              <Skeleton className="h-[210px] w-full bg-gray-200 rounded-md" />
              <Skeleton className="h-4 w-3/4 rounded-md mx-auto mt-3" />
              <Skeleton className="h-4 w-1/2 rounded-md mx-auto" />
            </div>
          ))}
      </div>
    </div>
  </div>
)

export default SkeletonLoader
