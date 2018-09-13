import Vue from 'vue'

const api = {
  getMusicList (data) {
    return Vue.http.get('/api/musicList')
  },
  getMusicDetail (data) {
    return Vue.http.get('/api/musicDetail', {params: data})
  },
  saveMusic (data) {
    return Vue.http.post('/api/saveMusic', data)
  },
  setStar (data) {
    return Vue.http.get('/api/setStar', {params: data})
  },
  deleteMusic (data) {
    return Vue.http.get('/api/deleteMusic', {params: data})
  }
}

export default api
