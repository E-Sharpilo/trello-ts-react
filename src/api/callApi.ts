const URL = 'http://localhost:8080/'

type Options = {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  headers?: {
    [key: string]: any
  }
  body?: any
  query?: any
}

export const cApi = async (endpoint: string, options: Options) => {
  let Url = URL

  if (options.query) {
    Url += endpoint + options.query
  } else {
    Url += endpoint
  }

  try {
    const res = await fetch(Url, {
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
