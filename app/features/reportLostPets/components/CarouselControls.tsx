import { Button } from '@/components/ui/button'
import { type CarouselApi } from '@/components/ui/carousel'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const CarouselControls = ({
  carouselApi,
  canScrollPrev,
  canScrollNext,
}: {
  carouselApi: CarouselApi | undefined
  canScrollPrev: boolean
  canScrollNext: boolean
}) => (
  <div className="mt-8 flex shrink-0 items-center justify-start gap-2">
    <Button
      size="icon"
      variant="outline"
      onClick={() => {
        carouselApi?.scrollPrev()
      }}
      disabled={!canScrollPrev}
      className="disabled:pointer-events-auto"
    >
      <ArrowLeft className="size-5" />
    </Button>
    <Button
      size="icon"
      variant="outline"
      onClick={() => {
        carouselApi?.scrollNext()
      }}
      disabled={!canScrollNext}
      className="disabled:pointer-events-auto"
    >
      <ArrowRight className="size-5" />
    </Button>
  </div>
)

export default CarouselControls
