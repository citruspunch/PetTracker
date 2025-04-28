import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import supabase from '@/lib/supabase'
import { appRoutes } from '@/routes'
import { Link, useLocation } from 'react-router'
import { toast } from 'sonner'

const VerifyEmail = () => {
  const location = useLocation()
  const userEmail = location.state?.userEmail
  const handleResendVerificationEmail = async () => {
    await supabase.auth.resend({
      type: 'signup',
      email: userEmail,
    })
    toast.info('Correo de verificación reenviado.')
  }

  return (
    <section className="h-screen bg-muted">
      <div className="flex h-full items-center justify-center mx-auto">
        <Card className="w-full max-w-sm mx-8">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl sm:text-4xl">
              Verifica tu correo
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-3 mb-1 text-base">
              Te hemos enviado un enlace de verificación a tu correo
              electrónico. Por favor, revisa tu bandeja de entrada y sigue las
              instrucciones para confirmar tu cuenta.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button className="w-full" onClick={handleResendVerificationEmail}>
              Reenviar correo de verificación
            </Button>
            <Link
              to={appRoutes.login}
              className="w-full text-center font-medium text-primary hover:underline"
            >
              Volver a iniciar sesión
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default VerifyEmail
