import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

type Props = React.ComponentProps<typeof Loader2>

const Loader = ({ className, ...props }: Props) => (
  <Loader2 className={cn('animate-spin', className)} {...props} />
)

export default Loader
