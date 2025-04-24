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
import supabase from '@/lib/supabase/supabase'
import { type Tables } from '@/lib/supabase/types'
import { appRoutes } from '@/routes'
import { type ReactNode } from 'react'
import { Link } from 'react-router'
import { toast } from 'sonner'

type Props = {
  children: ReactNode
  pet: Tables<'pet'>
}

const ConfirmDeleteDialog = ({ children, pet }: Props) => {
  const deletePet = async () => {
    const result = await supabase.from('pet').delete().eq('id', pet.id)
    if (result.error !== null) {
      toast.error('Ocurrió un error. Inténtalo de nuevo.')
      return
    }
    toast.success(`La mascota ${pet.name} ha sido eliminada.`)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="leading-6">
            ¿Estás seguro de que deseas eliminar a {pet.name}?
          </AlertDialogTitle>
          <AlertDialogDescription className="leading-5">
            Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={deletePet} asChild>
            <Link to={appRoutes.myPets}>Eliminar</Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmDeleteDialog
