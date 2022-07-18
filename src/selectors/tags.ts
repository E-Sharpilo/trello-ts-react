import { StateTags } from '../reducers/tags/type';

export const selectTags = (state:{ tags: StateTags }) => state.tags.tags
export const selectTag = (state:{ tags: StateTags }) => state.tags.tag