import { createAsyncThunk } from '@reduxjs/toolkit'
import { Board } from '../types/board'

export const getBoards = createAsyncThunk<Board[], undefined, { rejectValue: string }>(
  'tasks/getBoards',
  async (_, { rejectWithValue }) => {
    const res = await fetch('http://localhost:8080/board')

    if (!res.ok) return rejectWithValue('Fetch Error')

    return await res.json()
  },
)
