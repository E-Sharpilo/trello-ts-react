import axios, { AxiosRequestConfig } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { getLogoutFetch } from '../reducers/user';
import store from '../store';

const api = axios.create();

const URL = 'http://localhost:8080/';

type Options = {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  headers?: {
    [key: string]: string;
  };
  body?: any;
  query?: any;
};

export const callApi = async (endpoint: string, options: Options) => {
  let Url = URL;

  if (options.query) {
    const params: string[] = [];
    const keys = Object.keys(options.query);

    keys.forEach((key) => params.push(key + '=' + options.query[key]));

    Url += endpoint + '?' + params.join('&');
  } else {
    Url += endpoint;
  }

  const res = await api({
    withCredentials: true,
    url: Url,
    method: options.method || 'get',
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(options.body),
  });

  return res.data;
};

api.interceptors.request.use((config: AxiosRequestConfig) => {
  (config.headers ??= {}).Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

api.interceptors.response.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(`${URL}refresh`, { withCredentials: true });
        localStorage.setItem('token', response.data.accessToken);
        return api.request(originalRequest);
      } catch (error) {
        store.dispatch(getLogoutFetch(null));
      }
    }
    throw error;
  },
);

const refreshAuthLogic = (failedRequest: any) =>
  axios.get(`${URL}refresh`, { withCredentials: true }).then((tokenRefreshResponse) => {
    localStorage.setItem('token', tokenRefreshResponse.data.accessToken);
    failedRequest.response.config.headers['Authorization'] =
      'Bearer ' + tokenRefreshResponse.data.accessToken;
    return Promise.resolve();
  }).catch(e => {
    store.dispatch(getLogoutFetch(null));
  });

createAuthRefreshInterceptor(axios, refreshAuthLogic, {pauseInstanceWhileRefreshing: true});

// api.interceptors.response.use(
//   (config: AxiosRequestConfig) => {
//     return config;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && error.config && !error.config._isRetry) {
//       originalRequest._isRetry = true;
//       try {
//         const response = await axios.get(`${URL}refresh`, { withCredentials: true });
//         localStorage.setItem('token', response.data.accessToken);
//         return api.request(originalRequest);
//       } catch (error) {
//         store.dispatch(getLogoutFetch(null));
//       }
//     }
//     throw error;
//   },
// );

// let isAlreadyFetchingAccessToken = false
// let subscribers = []

// function onAccessTokenFetched(access_token) {
//   subscribers = subscribers.filter(callback => callback(access_token))
// }

// function addSubscriber(callback) {
//   subscribers.push(callback)
// }

// axios.interceptors.response.use(function (response) {
//   return response
// }, function (error) {
//   const { config, response: { status } } = error
//   const originalRequest = config

//   if (status === 401) {
//     if (!isAlreadyFetchingAccessToken) {
//       isAlreadyFetchingAccessToken = true
//       store.dispatch(fetchAccessToken()).then((access_token) => {
//         isAlreadyFetchingAccessToken = false
//         onAccessTokenFetched(access_token)
//       })
//     }

//     const retryOriginalRequest = new Promise((resolve) => {
//       addSubscriber(access_token => {
//         originalRequest.headers.Authorization = 'Bearer ' + access_token
//         resolve(axios(originalRequest))
//       })
//     })
//     return retryOriginalRequest
//   }
//   return Promise.reject(error)
// })