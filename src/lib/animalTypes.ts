export const animalTypes = [
  { label: 'Perro', value: 'dog' },
  { label: 'Gato', value: 'cat' },
] as const

export const formatAnimalType = (animalType: string): string =>
  animalTypes.find((element) => element.value === animalType)!.label
