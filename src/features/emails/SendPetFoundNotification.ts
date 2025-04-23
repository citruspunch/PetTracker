import { Resend } from 'resend'
import PetFoundNotification from './PetFoundNotification'
import SendPetFoundNotificationProps from './props/SendPetFoundNotificationProps'

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY)

const SendPetFoundNotification = async ({
  petName,
  petSex,
  finderName,
  finderLastName,
  city,
  location,
  contactNumber,
  notes,
  link,
  ownerEmail,
}: SendPetFoundNotificationProps) => {
  const subject = `¡Tu mascota ${petName} ha sido encontrada!`

  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ownerEmail!,
    subject: subject,
    react: PetFoundNotification({
      petName: petName,
      petSex: petSex,
      finderName: finderName,
      finderLastName: finderLastName,
      city: city,
      location: location,
      contactNumber: contactNumber,
      notes: notes,
      link: link,
    }),
  })

  if (error) {
    return console.error({ error })
  }

  console.log({ data })
}

export default SendPetFoundNotification