import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { type Tables } from '@/lib/supabase/types'
import { appRoutes } from '@/routes'
import { type ReactNode } from 'react'
import { Link } from 'react-router'

type Props = {
  children: ReactNode
  pet: Tables<'pet'>
}

const ReportLostPetAlertDialog = ({ children, pet }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="leading-6">
            ¿Estás seguro de marcar a {pet.name} como perdido?
          </AlertDialogTitle>
          <AlertDialogDescription className="leading-5">
            Esto marcará a tu mascota como perdida. Será visible en la sección
            de mascotas reportadas y otras personas podrán ayudarte a
            encontrarla.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Link to={`${appRoutes.reportLostPet}/${pet.id}`}>Continuar</Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ReportLostPetAlertDialog
