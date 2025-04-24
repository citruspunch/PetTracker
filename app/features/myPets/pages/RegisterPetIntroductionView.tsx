import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tables } from '@/lib/supabase-types'
import { cn } from '@/lib/utils'
import RegisterPetForm from './RegisterPetForm'

type Props = React.ComponentProps<typeof Card> & {
  petId: string
  onPetRegistered: (pet: Tables<'pet'>) => void
}

const RegisterPetIntroductionView = ({
  className,
  petId,
  onPetRegistered,
  ...props
}: Props) => {
  return (
    <Card className={cn('m-3', className)} {...props}>
      <CardHeader>
        <CardTitle className="text-3xl sm:text-4xl">Registra a tu mascota</CardTitle>
        <CardDescription>
          Notamos que tu mascota aún no tiene un perfil creado. Llena la
          siguiente información para que cualquier persona que encuentre a tu
          mascota y escanee su collar pueda acceder a la información más
          esencial.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <RegisterPetForm
          petId={petId}
          onRegisterUpdated={onPetRegistered}
          submitButtonText="Registrar"
        />
      </CardContent>
    </Card>
  )
}

export default RegisterPetIntroductionView
