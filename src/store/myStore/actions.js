import { api } from 'boot/axios'
import { Cookies } from 'quasar'
export function login ({ commit, state }, payload) {
    return new Promise(async (resolve, reject) => {
        try {
          const { data } = await api.post('login', payload)
          Cookies.set('authToken', data)
          resolve(data)
        }catch(e){
          reject(e)
        }
      })
}

export function register ({ commit, state }, payload) {
  return new Promise(async (resolve, reject) => {
      try {
      //  console.log("parametros", payload)
        const { data } = await api.post('registrar/usuario', payload)
     //   console.log("la data fue", data)
        resolve(data)
      }catch(e){
        console.log("error", e)
        reject(e)
      }
    })
}

export function validate ({ state }) {
  const token = Cookies.get('authToken')
  console.log("token", token.token)
    return api({
        url: 'getSession', 
        method: 'post',
        headers: {
          'Authorization': `Bearer ${token.token}`
        }
      })
}
