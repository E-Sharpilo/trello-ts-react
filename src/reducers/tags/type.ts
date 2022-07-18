import { TTag } from '../../types/tag'

export type StateTags = {
  tags: TTag[]
  tag: {
    id: string,
    title: string,
    color: string
  },
  loading: boolean
  error: string | null
}
