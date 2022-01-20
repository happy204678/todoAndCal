import axios from 'axios'
import qs from 'qs'
import methods from '@/service/methodService'
import vuexStore from '@/store'
const apiPath = process.env.apiPath

export default {
  apiUrl: apiPath + '/',
  get (method, params) {
    const data = params
    // const url = this.apiUrl + method
    const url = methods.getAPIPahth() + method
    const service = axios.create({
      timeout: 10000
    })
    service.interceptors.response.use(
      response => {
        return response.data
      },
      error => {
        return Promise.reject(error)
      }
    )
    return service.get(url, qs.stringify(data))
  },
  postSAMPLE (method, params) {
    const data = params
    // const url = this.apiUrl + method
    const url = methods.getAPIPahth() + method
    const service = axios.create({
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'AuthToken': vuexStore.getters.authToken
      }
    })

    service.interceptors.request.use((config) => {
      if (method.indexOf('HistoryLotteryInfoGet') === -1) {
        methods.loading(true)
      }
      return config
    }, (error) => {
      if (method.indexOf('HistoryLotteryInfoGet') === -1) {
        methods.loading(false)
      }
      return Promise.reject(error)
    })

    service.interceptors.response.use(
      response => {
        if (method.indexOf('HistoryLotteryInfoGet') === -1) {
          methods.loading(false)
        }
        const RES = response.data
        if (RES.Success) {
          return Promise.resolve(RES)
        } else {
          return Promise.reject(RES)
        }
      },
      error => {
        if (method.indexOf('HistoryLotteryInfoGet') === -1) {
          methods.loading(false)
        }
        return Promise.reject(error)
      }
    )

    /**
     * 送出 ajax
     */
    // return service.post(url, qs.stringify(data))
    return service.post(url, data)
  },
  post (method, params) {
    let inputVal = (params !== undefined) ? Object.values(params)[0] : ''
    const data = {
      InputData: inputVal,
      BaseInfo: {
        Language: vuexStore.getters.language
      }
    }

    // const url = this.apiUrl + method
    const url = methods.getAPIPahth() + method
    const service = axios.create({
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'AuthToken': vuexStore.getters.authToken
      }
    })

    service.interceptors.request.use((config) => {
      methods.loading(true)
      return config
    }, (error) => {
      methods.loading(false)
      return Promise.reject(error)
    })

    service.interceptors.response.use(
      response => {
        const RES = response.data
        methods.loading(false)
        if (RES.Success) {
          return Promise.resolve(RES)
        } else {
          return Promise.reject(RES)
        }
      },
      error => {
        methods.loading(false)
        return Promise.reject(error)
      }
    )

    return service.post(url, data)
  },
  getJSON (method, params) {
    const service = axios.create({
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return service.get(method)
  },
  // 加解密用的POST
  postEnc (method, params) {
    const data = methods.apiEncrypt(params)
    // const url = this.apiUrl + method
    const url = methods.getAPIPahth() + method
    const service = axios.create({
      timeout: 10000,
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
    })
    /**
     * Request 拦截器
     */
    service.interceptors.request.use((config) => {
      return config
    }, (error) => {
      return Promise.reject(error)
    })

    /**
     * response 拦截器
     */
    service.interceptors.response.use(
      response => {
        const RES = methods.apiDecrypt(response.data)
        if (RES.Success) {
          return Promise.resolve(RES)
        } else {
          return Promise.reject(RES)
        }
      },
      error => {
        return Promise.reject(error)
      }
    )

    /**
     * 送出 ajax
     */
    // return service.post(url, qs.stringify(data))
    return service.post(url, data)
  }
}
