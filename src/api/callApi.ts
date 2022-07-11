const URL = 'http://localhost:8080'

type Options = {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  headers?: {
    [key: string]: any
  }
  body?: any
}

export const cApi = async (endpoint: string, options: Options) => {
  try {
    const res = await fetch(`${URL}/${endpoint}`, {
      method: options.method || 'GET',
      headers: { ...options.headers, 'Content-Type': 'application/json' },
      body: JSON.stringify(options.body),
    })

    if (!res.ok) {
      throw new Error(res.statusText)
    }
    
    return await res.json()
  } catch (error) {
    return error
  }
}
