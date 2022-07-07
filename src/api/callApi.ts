/* eslint-disable no-unused-vars */
const URL = 'http://localhost:8080'

export const callApi = (endpoint = '', id = '', method = 'GET', item = {}) => {
  const headers = {
    'Content-Type': 'application/json',
  }

  if (endpoint === 'board' && method === 'POST') {
    console.log('this.two');
    return fetch(`${URL}/${endpoint}/${id}`, {
      method,
      headers,
      body: JSON.stringify(item)
    }).then(res => res.json())
  }

  if (endpoint === 'board') {
    console.log('thisone');
    
    return fetch(`${URL}/${endpoint}/${id}`).then((res) => res.json())
  }
}
