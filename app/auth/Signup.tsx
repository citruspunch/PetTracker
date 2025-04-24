import { FcGoogle } from 'react-icons/fc'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import supabase from '@/lib/supabase'
import { emailRegex, numberRegex, specialCharactersRegex } from '@/lib/utils'
import { appRoutes } from '@/routes'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'

interface SignupProps {
  heading?: string
  subheading?: string
  logo?: {
    url: string
    src: string
    alt: string
    title?: string
  }
  signupText?: string
  googleText?: string
  facebookText?: string
  appleText?: string
  loginText?: string
  loginUrl?: string
}

const Signup = ({
  heading = 'Registrarse',
  subheading = 'Crea una cuenta para comenzar',
  logo = {
    url: appRoutes.landing,
    src: '/PetTrackerLogo.png',
    alt: 'PetTrackerLogo',
    title: 'Pet Tracker',
  },
  googleText = 'Registrarse con Google',
  signupText = 'Crear cuenta',
  loginText = '¿Ya tienes una cuenta?',
  loginUrl = appRoutes.login,
}: SignupProps) => {
  const handleGoogleSignUp = async () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }

  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Email Validation
    if (!emailRegex.test(email)) {
      toast.error('Por favor, ingresa un correo electrónico válido.')
      return
    }

    // Password Validation
    if (password.length < 8) {
      toast.error('La contraseña debe tener al menos 8 caracteres.')
      return
    }
    if (!numberRegex.test(password)) {
      toast.error('La contraseña debe incluir al menos un número.')
      return
    }
    if (!specialCharactersRegex.test(password)) {
      toast.error('La contraseña debe incluir al menos un carácter especial.')
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      toast.error('Error al registrarse, por favor intenta de nuevo.')
      return
    }
    toast.success(
      'Registro exitoso, verifica tu correo electrónico para confirmar tu cuenta.'
    )
    navigate('/verify-email', { state: { userEmail: email } })
  }

  return (
    <section className="h-screen bg-muted">
      <div className="flex h-full items-center justify-center mx-auto">
        <div className="flex w-full max-w-sm flex-col items-center gap-y-6 rounded-md border border-muted bg-white px-6 py-8 shadow-md mx-5">
          <div className="flex flex-col items-center gap-y-3">
            {/* Logo */}
            <div className="flex items-center gap-2 lg:justify-start">
              <Link to={logo.url}>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.title}
                  className="h-12"
                />
              </Link>
            </div>
            <h1 className="mb-1 text-3xl sm:text-4xl font-bold">{heading}</h1>
            {subheading && (
              <p className="text-muted-foreground">{subheading}</p>
            )}
          </div>
          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Input
                  name="email"
                  type="email"
                  placeholder="Correo Electrónico"
                  required
                  className="bg-white"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Input
                  name="password"
                  type="password"
                  placeholder="Contraseña"
                  required
                  className="bg-white"
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="mt-2 w-full">
                  {signupText}
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleSignUp}
                >
                  <FcGoogle className="mr-2 size-5" />
                  {googleText}
                </Button>
              </div>
            </div>
          </form>
          <div className="flex justify-center gap-1 text-sm text-muted-foreground">
            <p>{loginText}</p>
            <Link
              to={loginUrl}
              className="font-medium text-primary hover:underline"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signup
