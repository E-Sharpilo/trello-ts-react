import { TCard } from '../../types/card'

export type StateCards = {
  cards: TCard[]
  loading: boolean
  error: string | null
}
