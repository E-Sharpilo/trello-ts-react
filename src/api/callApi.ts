import axios, { AxiosRequestConfig } from 'axios'

const api = axios.create()

const URL = 'http://localhost:8080/'

type Options = {
  method?: 'get' | 'post' | 'patch' | 'delete'
  headers?: {
    [key: string]: any
  }
  body?: any
  query?: any
}

export const callApi = async (endpoint: string, options: Options) => {
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
    const res = await api({
      withCredentials: true,
      url: Url,
      method: options.method || 'get',
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(options.body),
    })

    return res.data

  } catch (error) {
    return error
  }
}

api.interceptors.request.use((config: AxiosRequestConfig) => {
  (config.headers ??= {}).Authorization = `Bearer ${localStorage.getItem('token')}`
  return config;
})

api.interceptors.response.use(
  (config: AxiosRequestConfig) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        const response = await axios.get(`${URL}refresh`, { withCredentials: true })
        localStorage.setItem('token', response.data.accessToken)
        return api.request(originalRequest)
      } catch (error) {
        console.log('Not authorized')
      }
    }
    throw error
  },
)
