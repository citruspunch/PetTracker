import Loader from '@/components/Loader'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import supabase from '@/lib/supabase'
import { uploadPortrait } from '@/lib/utils'
import { appRoutes } from '@/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'
import { userProfileSchema } from '../models/UserProfileSchema'

type Props = {
  userId: string
  submitButtonText?: string
  profileValues?: z.infer<typeof userProfileSchema>
}

const CompleteProfileForm = ({
  userId,
  submitButtonText = 'Continuar',
  profileValues,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const petImageUrl = profileValues?.image_url
    ? supabase.storage
        .from('profiles-pictures')
        .getPublicUrl(profileValues.image_url).data.publicUrl
    : undefined
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    petImageUrl
  )
  const form = useForm<z.infer<typeof userProfileSchema>>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      first_name: profileValues?.first_name || '',
      last_name: profileValues?.last_name || '',
    },
  })

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (values: z.infer<typeof userProfileSchema>) => {
    setIsLoading(true)

    const uploadedImagePath = values.image_url
      ? await uploadPortrait(values.image_url, 'profiles-pictures')
      : null
    const queryParameters = uploadedImagePath
      ? {
          first_name: values.first_name,
          last_name: values.last_name,
          image_url: uploadedImagePath,
        }
      : {
          first_name: values.first_name,
          last_name: values.last_name,
        }

    const updateResult = await supabase
      .from('profiles')
      .update(queryParameters)
      .eq('id', userId)

    setIsLoading(false)
    if (updateResult.error === null) {
      toast.success('Tu perfil ha sido actualizado')
      navigate(`${appRoutes.dashboard}`)
      return
    }
    toast.error(
      'Ocurrió un error al editar la información de tu perfil. Inténtalo de nuevo.'
    )
    console.error(updateResult.error)
  }

  const profilePictureReference = form.register('image_url')

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellido</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image_url"
          render={() => (
            <FormItem>
              <FormLabel>Foto</FormLabel>
              <FormControl>
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex flex-col items-center space-y-4">
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Vista previa"
                        className="h-32 w-32 rounded-full object-cover"
                      />
                    )}
                    <Input
                      type="file"
                      {...profilePictureReference}
                      onChange={(event) => {
                        handleImageChange(event)
                      }}
                    />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {isLoading ? <Loader /> : <>{submitButtonText}</>}
        </Button>
      </form>
    </Form>
  )
}

export default CompleteProfileForm
