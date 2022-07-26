import { CardTags } from './card_tags'

export type TCard = {
  _id: string
  listId: string
  title: string
  tagsId: CardTags[]
  description: string
}