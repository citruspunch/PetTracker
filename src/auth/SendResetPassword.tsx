import { TbPasswordUser } from 'react-icons/tb'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'
import { routes } from '../routes'
import { toast } from 'sonner'
import supabase from '@/lib/supabase'
import { useState } from 'react'
import { emailRegex } from '@/lib/utils'

interface ResetPasswordProps {
  heading?: string
  subheading?: string
  resetText?: string
  loginText?: string
  loginUrl?: string
  logoUrl?: string
}

const ResetPassword = ({
  heading = 'Restablecer contraseña',
  subheading = 'Ingresa tu correo electrónico para restablecer tu contraseña',
  resetText = 'Enviar correo de restablecimiento',
  loginText = '¿Recuerdas tu contraseña?',
  loginUrl = routes.logIn,
  logoUrl = routes.home,
}: ResetPasswordProps) => {
  const [email, setEmail] = useState('')
  const handleResetPassword = async () => {
    if (!emailRegex.test(email)) {
      toast.error('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://pet-tracker-eosin.vercel.app/update-password',
    })
    if (error) {
      toast.error('Error al enviar el correo de restablecimiento.')
    } else {
      toast.success('Correo de restablecimiento enviado.')
    }
  }

  return (
    <section className="h-screen flex items-center justify-center bg-muted">
      <div className="container mx-auto">
        <div className="flex flex-col gap-4 mx-5">
          <div className="mx-auto w-full max-w-sm rounded-md p-6 shadow bg-white">
            <div className="mb-6 flex flex-col items-center">
              <Link to={logoUrl}>
                <TbPasswordUser className="size-10" />
              </Link>
              <h1 className="mb-5 mt-3 text-4xl font-bold text-center leading-9">
                {heading}
              </h1>
              <p className="text-muted-foreground text-center">{subheading}</p>
            </div>
            <div className="grid gap-4">
              <Input
                name='email'
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Ingresa tu correo electrónico"
                required
              />
              <Button type="submit" className="mt-2 w-full" onClick={handleResetPassword}>
                {resetText}
              </Button>
            </div>
            <div className="mx-auto mt-6 mb-2 flex justify-center gap-1 text-sm text-muted-foreground">
              <p>{loginText}</p>
              <Link
                to={loginUrl}
                className="font-medium text-primary hover:underline"
              >
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResetPassword
