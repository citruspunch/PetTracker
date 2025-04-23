import { formatContactNumber } from '@/lib/utils'
import {
  Body,
  Button,
  Column,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'
import * as React from 'react'
import PetFoundNotificationProps from './props/PetFoundNotificationProps'

const baseUrl = 'https://www.reactemailtemplate.com/'



export const PetFoundNotification = ({
  petName,
  petSex,
  finderName,
  finderLastName,
  city,
  location,
  contactNumber,
  notes,
  link,
}: PetFoundNotificationProps) => {
  const heading =
    petSex === 'male'
      ? `¡${petName} ha sido reportado como encontrado!`
      : `¡${petName} ha sido reportada como encontrada!`

  const found = petSex === 'male' ? 'encontrado' : 'encontrada'

  return (
    <Html>
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: 'https://fonts.googleapis.com/css2?family=Inter&display=swap',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>{heading}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans antialiased">
          <Container className="mx-auto my-[40px] rounded border border-solid border-gray-200 bg-white px-8">
            <Section className="py-10">
              <Row>
                <Column className="w-[80%]">
                  <Link href="https://pet-tracker-eosin.vercel.app/">
                    <Img
                      src={
                        'https://pet-tracker-eosin.vercel.app/PetTrackerLogo.png'
                      }
                      width="62"
                      height="60"
                      alt="PetTracker Logo"
                    />
                  </Link>
                </Column>
                <Column align="right">
                  <Row align="right">
                    <Column>
                      <Link href="#">
                        <Img
                          src={`${baseUrl}/facebook-logo.png`}
                          width="36"
                          height="36"
                          className="mx-1"
                        />
                      </Link>
                    </Column>
                    <Column>
                      <Link href="#">
                        <Img
                          src={`${baseUrl}/twitter-logo.png`}
                          width="36"
                          height="36"
                          className="mx-1"
                        />
                      </Link>
                    </Column>
                    <Column>
                      <Link href="#">
                        <Img
                          src={`${baseUrl}/instagram-logo.png`}
                          width="36"
                          height="36"
                          className="ml-1"
                        />
                      </Link>
                    </Column>
                  </Row>
                </Column>
              </Row>
            </Section>
            <Section className="rounded-xl bg-blue-500">
              <div className="mx-auto my-auto p-10">
                <Text className="m-0 text-white">{}</Text>
                <Heading className="m-0 mt-1 leading-[35px] font-bold text-white" as="h1">
                  {heading}
                </Heading>
                <Text className="mb-1 text-[16px] italic leading-[20px] mt-3 text-white">
                  Reporta a {petName} como {found} para que se elimine
                  de mascotas perdidas. <br />
                </Text>
                <Button
                  className="mt-4 rounded-lg bg-white px-10 py-3 font-semibold text-indigo-600 text-center"
                  href={link}
                  rel="noopener noreferrer"
                >
                  Reportar como {found}
                </Button>
              </div>
            </Section>
            <Hr className="mx-0 my-10 w-full border border-solid border-gray-200" />
            <Section>
              <Row className="mt-8">
                <Text className="m-0 text-xl font-semibold text-gray-900 leading-[24px]">
                  {petName} ha sido {found} por:
                </Text>
                <Text className="mt-2 text-[16.5px] text-gray-500">
                  {finderName} {finderLastName}
                </Text>
              </Row>
              <Row className="mt-8">
                <Text className="m-0 text-xl font-semibold text-gray-900">
                  Número de contacto:
                </Text>
                <Text className="mt-2 text-[16.5px] text-gray-500">
                  {formatContactNumber(contactNumber!)}
                </Text>
              </Row>
              <Row className="mt-8">
                <Text className="m-0 text-xl font-semibold text-gray-900">
                  Lugar donde fue {found}:
                </Text>
                <Text className="mt-2 text-[16.5px] text-gray-500">
                  {location}, {city}{' '}
                </Text>
                <Link
                  href={`https://www.google.com/maps?q=${encodeURIComponent(
                    location!
                  )},${encodeURIComponent(city!)}`}
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline"
                >
                  Ver en Google Maps
                </Link>
              </Row>
              <Row className="mt-8">
                <Text className="m-0 text-xl font-semibold text-gray-900">
                  Notas
                </Text>
                <Text className="mt-2 text-[16.5px] text-gray-500">
                  {notes ?? `${finderName} no añadió notas adicionales`}
                </Text>
              </Row>
            </Section>
            <Hr className="mx-0 mb-8 w-full border border-solid border-gray-200" />
            <Section className="pb-10">
              <Row>
                <Column className="w-[45%]">
                  <Img
                    src={
                      'https://pet-tracker-eosin.vercel.app/PetTrackerLogo.png'
                    }
                    width="60"
                    height="60"
                    alt="PetTracker Logo"
                  />
                  <Text className="my-2 text-[18px] font-semibold text-gray-900">
                    Pet Tracker
                  </Text>
                  <Text className="mt-1 italic text-[16px] leading-[20px] text-gray-500">
                    Encuentra. Conecta. <br />
                    Protege.
                  </Text>
                </Column>
                <Column align="left" className="table-cell align-bottom">
                  <Row className="table-cell h-[42px] w-[56px] align-bottom">
                    <Column>
                      <Link href="#">
                        <Img
                          src={`${baseUrl}/facebook-logo.png`}
                          className="-ml-1 mr-1"
                          width="36"
                          height="36"
                        />
                      </Link>
                    </Column>
                    <Column>
                      <Link href="#">
                        <Img
                          src={`${baseUrl}/twitter-logo.png`}
                          className="mx-1"
                          width="36"
                          height="36"
                        />
                      </Link>
                    </Column>
                    <Column>
                      <Link href="#">
                        <Img
                          src={`${baseUrl}/instagram-logo.png`}
                          className="mx-1"
                          width="36"
                          height="36"
                        />
                      </Link>
                    </Column>
                  </Row>
                  <Row>
                    <Text className="my-2 text-[16px] text-gray-500">
                      Universidad Galileo
                    </Text>
                    <Text className="mt-1 text-[16px] text-gray-500">
                      Ciudad de Guatemala, Guatemala
                    </Text>
                  </Row>
                </Column>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default PetFoundNotification

PetFoundNotification.PreviewProps = {
  petName: 'Chocobanano',
  finderName: 'Samuel Marroquin',
  city: 'Ciudad de Guatemala',
  location: 'Calle 1-23, Zona 1',
  contactNumber: '1234-5678',
  ownerName: 'Andres Tobar',
  finderImage:
    'https://static.vecteezy.com/system/resources/previews/003/428/270/non_2x/businessman-explain-pose-character-design-free-vector.jpg',
  petImage:
    'https://cdn.sanity.io/images/5vm5yn1d/pro/5cb1f9400891d9da5a4926d7814bd1b89127ecba-1300x867.jpg?fm=webp&q=80',
} as PetFoundNotificationProps

// import {
//   Body,
//   Button,
//   Column,
//   Container,
//   Head,
//   Heading,
//   Hr,
//   Html,
//   Img,
//   Preview,
//   Row,
//   Section,
//   Tailwind,
//   Text,
// } from '@react-email/components'
// import { ArrowBigRightDash, MapPinCheck } from 'lucide-react'

//

//   return (
//     <Html>
//       <Head />
//       <Tailwind>
//         <Body className="bg-white my-auto mx-auto font-sans px-2">
//           <Preview>{heading}</Preview>
//           <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
//             <Section className="mt-[32px]">
//               <Img
//                 src={'https://pet-tracker-eosin.vercel.app/PetTrackerLogo.png'}
//                 width="40"
//                 height="40"
//                 alt="PetTracker Logo"
//                 className="my-0 mx-auto"
//               />
//             </Section>
//             <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
//               Tu mascota <strong>{petName}</strong> fue encontrada!
//             </Heading>
//             <Text className="text-black text-[14px] leading-[24px]">
//               Hola {userName || 'usuario'},
//             </Text>
//             <Text className="text-black text-center text-[14px] leading-[24px]">
//               <strong>{finderName}</strong> ha encontrado a {petName} en: <br />
//               <strong>{location}</strong>, {city} <br />
//             </Text>
//             <Section>
//               <Row>
//                 <Column align="right">
//                   <Img
//                     className="rounded-full"
//                     src={finderImage}
//                     width="64"
//                     height="64"
//                     alt={`${petName}'s profile picture`}
//                   />
//                 </Column>
//                 <Column align="center">
//                   <ArrowBigRightDash />
//                 </Column>
//                 <Column align="left">
//                   <Img
//                     className="rounded-full"
//                     src={petImage}
//                     width="64"
//                     height="64"
//                     alt={`Pet ${petName} image`}
//                   />
//                 </Column>
//               </Row>
//               <Text className="text-black text-[14px] leading-[24px] mb-[16px]">
//               Puedes contactarlo al número: <strong>{contactNumber}</strong>
//             </Text>
//             </Section>
//             <Text className="text-black mt-[32px] text-[14px] italic leading-[19px] mb-[16px]">
//               Recuerda reportar a {petName} como encontrada para que ya no
//               aparezca en mascotas perdidas.
//             </Text>
//             <Section className="text-center mb-[32px]">
//               <Button
//                 className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
//                 href={link}
//               >
//                 Reportar como encontrada
//               </Button>
//             </Section>

//             <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
//             <Text className="text-[#666666] text-[12px] leading-[24px]">
//               Este correo fue enviado a través de{' '}
//               <span className="text-black">PetTracker</span> para notificarte
//               sobre tu mascota <span className="text-black">{petName}</span>. Si
//               no esperabas recibir este correo, puedes ignorarlo. Si tienes
//               alguna preocupación sobre la seguridad de tu cuenta, por favor
//               responde a este correo para ponerte en contacto con nosotros.
//             </Text>
//           </Container>
//         </Body>
//       </Tailwind>
//     </Html>
//   )
// }

// interface PetFoundNotificationProps {
//   userName?: string
//   petName?: string
//   finderName?: string
//   city?: string
//   location?: string
//   contactNumber?: string
//   ownerName?: string
//   finderImage?: string
//   petImage?: string
//   notes?: string
//   link?: string
// }

// export default PetFoundNotification
