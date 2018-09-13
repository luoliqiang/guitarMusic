import axios from 'axios'

export default {
  install (Vue, store) {
    let instance = axios.create()
    let CancelToken = axios.CancelToken

    instance.defaults.baseURL = ''
    instance.defaults.timeout = 5000

    let rqtArr = []

    const removeRqt = function (config) {
      const rqtUrl = config.baseURL + config.url + config.method
      if (rqtArr && rqtArr.length) {
        for (let i in rqtArr) {
          if (rqtArr[i]['url'] === rqtUrl) {
            rqtArr[i]['cb'] && rqtArr[i]['cb']()
            rqtArr.splice(i, 1)// 移除
            break
          }
        }
      }
    }

    const addRqt = function (url, cb = function () {}) {
      rqtArr.push({url: url, cb: cb})
    }

    // request拦截器
    instance.interceptors.request.use(function (config) {
      removeRqt(config)
      config.cancelToken = new CancelToken(function executor (cb) {
        addRqt(config.baseURL + config.url + config.method, cb)
      })
      return config
    }, function (error) {
      Promise.reject(error)
    })

    // response拦截器
    instance.interceptors.response.use(function (response) {
      const rData = response.data
      if (rData.code !== 0) {
        Vue.prototype.$message.error(rData.msg || '服务器开了一个小差，请稍后重试!')
        return Promise.reject(response)
      }
      return {data: rData, response: response}
    }, function (error) {
      Promise.reject(error)
    })

    Vue.prototype.$http = instance
    Vue.http = instance
  }
}
