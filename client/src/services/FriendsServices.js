import Api from '@/services/api'

export default {
  // getFriends (user) {
  //   return Api().post('friends', user)
  // },
  sendReq (data) {
    return Api().post('friends/req', data)
  },
  acceptReq (data) {
    return Api().post('friends/req/accept', data)
  }
}
