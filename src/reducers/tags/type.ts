import { TTag } from '../../types/tag'

export type StateTags = {
  tags: TTag[]
  loading: boolean
  error: string | null
}
