import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { type Tables } from '@/lib/supabase/types'
import { appRoutes } from '@/routes'
import { type ComponentProps } from 'react'
import { useNavigate } from 'react-router'

type Props = {
  pet: Tables<'pet'>
} & ComponentProps<typeof Card>

const LostPetAlert = ({ pet, ...props }: Props) => {
  const navigate = useNavigate()
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Esta mascota se encuentra perdida</CardTitle>
      </CardHeader>
      <CardContent>
        Por favor repórtala como encontrada y ayuda a {pet.name} a regresar a
        casa
      </CardContent>
      <CardFooter className="flex justify-stretch">
        <Button
          onClick={() => navigate(`${appRoutes.reportFoundPet}/${pet.id}`)}
          className="w-full"
        >
          Reportar
        </Button>
      </CardFooter>
    </Card>
  )
}

export default LostPetAlert
