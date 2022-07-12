import { TCard } from '../../types/card'

export type TCards = {
  cards: TCard[]
  loading: boolean
  error: string | null
}
