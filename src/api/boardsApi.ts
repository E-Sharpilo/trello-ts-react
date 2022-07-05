import { createAsyncThunk } from '@reduxjs/toolkit'
import { TBoard } from '../types/board'

export const getBoards = createAsyncThunk<TBoard[], undefined, { rejectValue: string }>(
  'boards/getBoards',
  async (_, { rejectWithValue }) => {
    const res = await fetch('http://localhost:8080/board')

    if (!res.ok) return rejectWithValue('Fetch Error')

    return await res.json()
  },
)
