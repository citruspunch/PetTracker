import { FcGoogle } from 'react-icons/fc'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import supabase from '@/lib/supabase'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { routes } from '../routes'

interface LoginProps {
  heading?: string
  subheading?: string
  logo?: {
    url: string
    src: string
    alt: string
  }
  loginText?: string
  googleText?: string
  facebookText?: string
  appleText?: string
  signupText?: string
  signupUrl?: string
  redirectRoute?: string
}

const Login = ({
  heading = 'Iniciar sesión',
  subheading = 'Bienvenido de nuevo',
  logo = {
    url: routes.home,
    src: '/PetTrackerLogo.png',
    alt: 'PetTrackerLogo',
  },
  loginText = 'Iniciar Sesión',
  googleText = 'Acceder con Google',
  signupText = '¿Aún no tienes cuenta?',
  signupUrl = routes.signUp,
  redirectRoute = routes.dashboard,
}: LoginProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const login = async () => {
    setLoading(true)
    // TODO: add validations for empty fields
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (error === null) navigate(redirectRoute)
    setLoading(false)
  }

  const handleGoogleSignIn = async () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }

  return (
    <section className="h-screen flex items-center justify-center bg-muted">
      <div className="container mx-auto">
        <div className="flex flex-col gap-4 mx-5">
          <div className="mx-auto w-full max-w-sm rounded-md p-6 shadow bg-white">
            <div className="mb-6 flex flex-col items-center">
              <Link to={logo.url} className="mb-3 flex items-center gap-2">
                <img src={logo.src} className="max-h-11" alt={logo.alt} />
              </Link>
              <h1 className="mb-2 text-3xl sm:text-4xl font-bold text-center">{heading}</h1>
              <p className="text-muted-foreground">{subheading}</p>
            </div>
            <div className="grid gap-4">
              <Input
                type="email"
                placeholder="Ingresa tu correo electrónico"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Ingresa tu contraseña"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <div className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    className="border-muted-foreground"
                    checked={showPassword}
                    onCheckedChange={(checked) =>
                      setShowPassword(checked as boolean)
                    }
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Mostrar contraseña
                  </label>
                </div>
                <Link
                  to={routes.resetPassword}
                  className="text-sm text-primary text-right hover:underline leading-4"
                >
                  Olvidé mi contraseña
                </Link>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-3">
              {loading ? (
                <Button disabled>
                  <Loader2 className="animate-spin mr-2" />
                  Iniciando sesión...
                </Button>
              ) : (
                <Button type="submit" className="mt-2 w-full" onClick={login}>
                  {loginText}
                </Button>
              )}
              <Button
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignIn}
              >
                <FcGoogle className="mr-2 size-5" />
                {googleText}
              </Button>
            </div>
            <div className="mx-auto mt-7 mb-2 flex justify-center gap-1 text-sm text-muted-foreground">
              <p>{signupText}</p>
              <Link
                to={signupUrl}
                className="font-medium text-primary hover:underline"
              >
                Registrate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
