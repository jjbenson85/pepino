class Auth{
  static setToken(token){
    localStorage.setItem('token', token)
  }

  static getToken(){
    return localStorage.getItem('token')
  }

  static getPayload(){
    const token = this.getToken()
    if(!token) return false
    const parts= token.split('.')
    if(parts.length < 3 ) return false
    try {
      return JSON.parse(atob(parts[1]))
    } catch {
      return false
    }
  }

  static getUserID(){
    return this.getPayload().sub
  }

  static isAuthenticated(){
    const payload = this.getPayload()
    if(!payload) return false
    const now = Math.round(Date.now() / 1000)
    if(now < payload.exp){
      return now < payload.exp
    }else{
      this.removeToken()
      return false
    }

  }

  static checkAvailability(id){
    if(this.getUserID() === id && this.isAuthenticated()) return true
    return false
  }

  static removeToken(){
    localStorage.removeItem('token')
  }

}

export default Auth
