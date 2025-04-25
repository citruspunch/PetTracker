import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import CompleteProfileForm from './CompleteProfileForm'

type Props = React.ComponentProps<typeof Card> & {
  userId: string
}

const CompleteProfileCard = ({ className, userId, ...props }: Props) => {
  return (
    <Card className={cn('m-5', 'w-9/10 sm:max-w-3/4 md:max-w-3/5 lg:max-w-1/3', 'mx-auto', className)} {...props}>
      <CardHeader>
        <CardTitle className="text-3xl sm:text-4xl leading-8 tracking-tight text-center font-bold">
          Completa tu perfil
        </CardTitle>
        <CardDescription className='text-center leading-5 mt-2'>
          Llena la siguiente información para que podamos brindarte una mejor
          experiencia.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <CompleteProfileForm userId={userId} submitButtonText="Listo" />
      </CardContent>
    </Card>
  )
}

export default CompleteProfileCard
