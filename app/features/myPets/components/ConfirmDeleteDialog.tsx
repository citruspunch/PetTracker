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
import type { Tables } from '@/lib/supabase/types'
import { appRoutes } from '@/routes'
import { type ReactNode } from 'react'
import { useFetcher } from 'react-router'
import type { PetOperation } from '../models/petOperation'

type Props = {
  children: ReactNode
  pet: Tables<'pet'>
}

const ConfirmDeleteDialog = ({ children, pet }: Props) => {
  const fetcher = useFetcher()

  const handleConfirm = () =>
    fetcher.submit({ operation: 'delete', pet: pet } satisfies PetOperation, {
      method: 'post',
      action: `${appRoutes.petDetails}/${pet.id}`,
      encType: 'application/json',
    })

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
          <AlertDialogAction onClick={handleConfirm}>
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmDeleteDialog
