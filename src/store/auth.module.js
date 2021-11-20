import AuthService from '@/services/modules/auth'
import axios from '@/services/axios'
import jwt_decode from 'jwt-decode'

var token = window.localStorage.getItem("AUTH_BEARER")

try {
  var payload = jwt_decode(token)
} catch(err) {
  token = null
  AuthService.logout()
}

const initialState =  token 
? { status: { loggedIn: true}, token, data: payload} 
: { status: { loggedIn: false}, token: null, data: null} 

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
      login({ commit }, user) {
        return AuthService.login(user)
        .then(token => {
          commit('loginSuccess', token);
          axios.defaults.headers['Authorization'] = token;
          return Promise.resolve(token);
        })
        .catch(error => {
            commit('loginFailure');
            return Promise.reject(error);
          });
      },
      logout({ commit }) {
        AuthService.logout();
        commit('logout');
      },
    },
    mutations: {
      loginSuccess(state, token) {
        state.status.loggedIn = true;
        state.token = token;
      },
      loginFailure(state) {
        state.status.loggedIn = false;
        state.token = null;
      },
      logout(state) {
        state.status.loggedIn = false;
        state.token = null;
      },
    }
  };