import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router'

const ErrorView = ({ message }: { message: string }) => {
  const navigate = useNavigate()
  return (
    <Alert variant="destructive" className="flex flex-col items-center">
      <AlertCircle className="h-4 w-4 mb-3" />
      <AlertTitle>Oops! Ha ocurrido un error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
      <Button className="mt-3" variant="outline" onClick={() => navigate(-1)}>
        Regresar
      </Button>
    </Alert>
  )
}

export default ErrorView
