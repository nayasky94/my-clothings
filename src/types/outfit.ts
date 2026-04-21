export interface Outfit {
  id: string
  date: string
  clothingIds: string[]
  clothingNames: string[]
  createdAt: string
}

export type OutfitList = Outfit[]

export const OUTFIT_STORAGE_KEY = 'outfit-records' as const
