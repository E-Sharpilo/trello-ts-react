import { createAsyncThunk } from '@reduxjs/toolkit'
import { TList } from '../types/list'

export const getLists = createAsyncThunk<TList[], string, { rejectValue: string }>(
  'lists/getLists',
  async (id, { rejectWithValue }) => {
    const res = await fetch(`http://localhost:8080/list?boardId=${id}`)

    if (!res.ok) return rejectWithValue('Fetch Error')

    return await res.json()
  },
)
