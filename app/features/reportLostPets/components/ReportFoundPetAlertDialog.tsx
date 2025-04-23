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
import supabase from '@/lib/supabase'
import { Tables } from '@/lib/supabase-types'
import { ReactNode } from 'react'
import { toast } from 'sonner'

type Props = {
  children: ReactNode
  pet: Tables<'pet'>
  report: Tables<'lost_pet_report'>
  onMarked: () => void
}

const ReportFoundPetAlertDialog = ({
  children,
  pet,
  report,
  onMarked,
}: Props) => {
  const markPetAsFound = async () => {
    const result = await supabase
      .from('lost_pet_report')
      .update({ found_date: new Date().toISOString() })
      .eq('id', report.id)
    if (result.error !== null) {
      toast.error('Ocurrió un error. Inténtalo de nuevo.')
      return
    }
    onMarked()
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="leading-6">
            ¿Estás seguro de marcar a {pet.name} como encontrado?
          </AlertDialogTitle>
          <AlertDialogDescription className="leading-5">
            El reporte de desaparición de tu mascota ya no será visible en la
            sección de mascotas perdidas y otras personas no podrán ayudarte a
            encontrarla.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={markPetAsFound}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ReportFoundPetAlertDialog
