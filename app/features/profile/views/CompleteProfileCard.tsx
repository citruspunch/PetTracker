import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import CompleteProfileForm from './CompleteProfileForm'
import { useEffect, useState } from 'react'
import supabase from '@/lib/supabase'
import type { Tables } from '@/lib/supabase/types'
import { Loader } from 'lucide-react'

type Props = React.ComponentProps<typeof Card> & {
  userId: string
}

const CompleteProfileCard = ({ className, userId, ...props }: Props) => {
  const [userProfile, setUserProfile] = useState<Tables<'profiles'> | null>(
    null
  )
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const loadProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      if (error) {
        console.error('Error fetching user profile:', error)
        return
      }
      setUserProfile(data)
      setIsLoading(false)
    }
    loadProfile()
  }, [])

  return (
    <>
      {isLoading && (
        <div className="flex flex-col items-center mt-10">
          <Loader className="mb-3" />
          <p>Cargando...</p>
        </div>
      )}
      {!isLoading && (
        <Card
          className={cn(
            'mt-8 w-9/10 sm:max-w-3/4 md:max-w-3/5 lg:max-w-1/3',
            'mx-auto',
            className
          )}
          {...props}
        >
          <CardHeader>
            <CardTitle className="text-3xl sm:text-4xl leading-8 tracking-tight text-center font-bold">
              Completa tu perfil
            </CardTitle>
            <CardDescription className="text-center leading-5 mt-2">
              Llena la siguiente información para que podamos brindarte una
              mejor experiencia.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <CompleteProfileForm
              key={userProfile?.id}
              userId={userId}
              submitButtonText="Listo"
              profileValues={{
                first_name: userProfile?.first_name || '',
                last_name: userProfile?.last_name || '',
                image_url: userProfile?.image_url || '',
              }}
            />
          </CardContent>
          
        </Card>
      )}
    </>
  )
}

export default CompleteProfileCard
