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
    <Card className={cn('m-5', className)} {...props}>
      <CardHeader>
        <CardTitle className="text-3xl sm:text-4xl">
          Completa tu perfil
        </CardTitle>
        <CardDescription>
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
