import { TbPasswordUser } from 'react-icons/tb'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import supabase from '@/lib/supabase'
import { appRoutes } from '@/routes'
import { useState } from 'react'
import { Link } from 'react-router'
import { toast } from 'sonner'

interface UpdatePasswordProps {
  heading?: string
  subheading?: string
  updateText?: string
  loginText?: string
  loginUrl?: string
  logoUrl?: string
}

const UpdatePassword = ({
  heading = 'Actualizar contraseña',
  subheading = 'Ingresa tu nueva contraseña',
  updateText = 'Actualizar contraseña',
  loginText = '¿Recuerdas tu contraseña?',
  loginUrl = appRoutes.login,
  logoUrl = appRoutes.landing,
}: UpdatePasswordProps) => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleUpdatePassword = async () => {
    if (password.length < 8) {
      toast.error('La contraseña debe tener al menos 8 caracteres.')
      return
    }

    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden.')
      return
    }

    setIsSubmitting(true)

    const { error } = await supabase.auth.updateUser({
      password,
    })

    if (error) {
      toast.error('Error al actualizar la contraseña.')
      console.error('Error updating password:', error.message)
    } else {
      toast.success('Contraseña actualizada con éxito.')
    }

    setIsSubmitting(false)
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
                name="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Nueva contraseña"
                required
              />
              <Input
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Confirmar contraseña"
                required
              />
              <Button
                type="submit"
                className="mt-2 w-full"
                onClick={handleUpdatePassword}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Actualizando...' : updateText}
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

export default UpdatePassword
