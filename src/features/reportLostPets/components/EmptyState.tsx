import { Button } from '@/components/ui/button'
import { MdPets } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

interface EmptyStateProps {
  heading?: string
  description?: string
  url: string
  variant?: 'outline' | 'destructive'
  buttonText?: string
}

const EmptyState: React.FC<EmptyStateProps> = ({
  heading = 'No se encontró a la mascota',
  description = 'Vuelve a intentarlo. Asegúrate de que la mascota esté registrada en la aplicación.',
  url,
  variant = 'outline',
  buttonText = 'Continuar',
}: EmptyStateProps) => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <MdPets className="h-16 w-16 mb-4" />
      <p className="text-lg font-semibold ">{heading}</p>
      <p className="text-sm text-muted-foreground w-5/6">{description}</p>
      <Button
        variant={variant}
        onClick={() => navigate(url)}
        className="mt-6 mb-30"
      >
        {buttonText}
      </Button>
    </div>
  )
}

export default EmptyState
