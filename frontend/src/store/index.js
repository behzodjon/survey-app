
import { createStore } from 'vuex';
import axiosClient from '../axios';
const store = createStore({
    state: {
        user: {
            data: {
            },
            token: sessionStorage.getItem('TOKEN'),
        },
        questionTypes: ['text', 'select', 'radio', 'checkbox', 'textarea']
    },
    getters: {},
    actions: {
        saveSurvey({ commit }, survey) {
            let response;
            if (survey.id) {
                response = axiosClient.put(`/survey/${survey.id}`, survey)
                    .then((res) => {
                        commit('updateSurvey', res.data);
                        return res;
                    })
            } else {
                response = axiosClient.post(`/survey`, survey)
                    .then((res) => {
                        commit('saveSurvey', res.data);
                        return res;
                    })
            }
            return response
        },
        register({ commit }, user) {
            return axiosClient.post('/register', user)
                .then(({ data }) => {
                    commit('setUser', data.user);
                    commit('setToken', data.token)
                    return data;
                })
        },
        login({ commit }, user) {
            return axiosClient.post('/login', user)
                .then(({ data }) => {
                    commit('setUser', data.user);
                    commit('setToken', data.token)

                    return data;
                })
        },
        logout({ commit }) {
            return axiosClient.post('/logout')
                .then(response => {
                    commit('logout')
                    return response
                })
        }
    },
    mutations: {
        saveSurvey: (state, survey) => {
            state.surveys = [...state.surveys, survey.data]
        },
        updateSurvey: (state, survey) => {
            state.surveys = state.surveys.map((s) => {
                if (s.id == survey.data.id) {
                    return survey.data
                }
                return s;
            })
        },
        logout: (state) => {
            state.user.data = {}
            state.user.token = null
        },
        setUser: (state, userData) => {
            state.user.token = userData.token
            state.user.data = userData.user;
            sessionStorage.setItem('TOKEN', userData.token)
        },
        setToken: (state, token) => {
            state.user.token = token;
            sessionStorage.setItem('TOKEN', token);
        },
    },
    modules: {}
})

export default store;