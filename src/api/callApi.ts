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
    const params: string[] = []
    const keys = Object.keys(options.query)

    keys.forEach((key) => params.push(key + '=' + options.query[key]))

    Url += endpoint + '?' + params.join('&')
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
