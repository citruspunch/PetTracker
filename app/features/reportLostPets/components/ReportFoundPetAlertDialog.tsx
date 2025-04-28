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
import { type ReactNode } from 'react'

type Props = {
  children: ReactNode
  petName: string
  onConfirm: () => void
}

const ReportFoundPetAlertDialog = ({ children, petName, onConfirm }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="leading-6">
            ¿Estás seguro de marcar a {petName} como encontrado?
          </AlertDialogTitle>
          <AlertDialogDescription className="leading-5">
            El reporte de desaparición de tu mascota ya no será visible en la
            sección de mascotas perdidas y otras personas no podrán ayudarte a
            encontrarla.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ReportFoundPetAlertDialog
