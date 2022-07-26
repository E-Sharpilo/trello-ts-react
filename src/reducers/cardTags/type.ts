import { CardTags } from '../../types/card_tags'

export type StateCardTags = {
  cardTags: CardTags[]
  loading: boolean
  error: string | null
}