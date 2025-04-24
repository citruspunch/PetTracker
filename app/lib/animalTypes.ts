export const animalTypes = ['dog', 'cat'] as const

export const formatAnimalType = (animalType: string): string => {
  switch (animalType) {
    case 'dog':
      return 'Perro'
    case 'cat':
      return 'Gato'
    default:
      throw new Error(`Unexpected animal type: ${animalType}`)
  }
}
