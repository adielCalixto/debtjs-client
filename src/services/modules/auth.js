import axios from '../axios'

class AuthService {
  login(user) {
    return axios
      .post('/usuarios/login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data) {
          window.localStorage.setItem('AUTH_BEARER', response.data);
        }

        return Promise.resolve(response.data);
      })
      .catch(error => {
        return Promise.reject(error);
      })
  }

  logout() {
    window.localStorage.removeItem('AUTH_BEARER');
  }
}
  
export default new AuthService();