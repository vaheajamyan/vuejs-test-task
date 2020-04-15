import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = () => new Vuex.Store({
    state: {
      token: localStorage.getItem('token') || '',
      data: {},
    },
    mutations: {
      SET_DATA(state, data) {
        state.data = {...state.data, [data.id]: data};
      },
      SET_TOKEN(state, token) {
        state.token = token;
      }
    },
    actions: {
      setData(context, data) {
        context.commit('SET_DATA', data);
      },
      setToken(context, token) {
        context.commit('SET_TOKEN', token);
      },
    }
  });

export default store
