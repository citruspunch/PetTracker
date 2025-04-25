import { createHmac } from 'node:crypto'

const generateSignature = (data: string) =>
  createHmac('sha256', import.meta.env.VITE_ENCRYPTION_PASSWORD)
    .update(data)
    .digest('hex')

export default generateSignature
