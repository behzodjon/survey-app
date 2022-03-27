
import { createStore } from 'vuex';
import axiosClient from '../axios';
const store = createStore({
    state: {
        user: {
            data: {
            },
            token: sessionStorage.getItem('TOKEN'),
        },
        surveys: {
            loading: false,
            data: []
        },
        questionTypes: ['text', 'select', 'radio', 'checkbox', 'textarea'],
        currentSurvey: {
            loading: false,
            data: {}
        }
    },
    getters: {},
    actions: {
        getSurveys({ commit }) {
            commit("setSurveysLoading", true)
            return axiosClient.get('/survey').then((res) => {
                commit("setSurveysLoading", false)
                commit("setSurveys", res.data)

                return res
            })

        },
        getSurvey({ commit }, id) {
            commit("setCurrentSurveyLoading", true)
            return axiosClient.get(`/survey/${id}`)
                .then((res) => {
                    commit("setCurrentSurveyLoading", false)
                    commit('setCurrentSurvey', res.data);
                    return res;
                })
                .catch((err) => {
                    commit("setCurrentSurveyLoading", false)
                    throw err
                })
        },
        saveSurvey({ commit }, survey) {
            delete survey.image_url
            let response;
            if (survey.id) {
                response = axiosClient.put(`/survey/${survey.id}`, survey)
                    .then((res) => {
                        commit('setCurrentSurvey', res.data);
                        return res;
                    })
            } else {
                response = axiosClient.post(`/survey`, survey)
                    .then((res) => {
                        commit('setCurrentSurvey', res.data);
                        return res;
                    })
            }
            return response
        },
        deleteSurvey({ }, id) {
            return axiosClient.delete(`/survey/${id}`)
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
        setSurveysLoading: (state, loading) => {
            state.surveys.loading = loading
        },
        setCurrentSurveyLoading: (state, loading) => {
            state.currentSurvey.loading = loading
        },
        setSurveys: (state, surveys) => {
            state.surveys.data = surveys.data
        },
        setCurrentSurvey: (state, survey) => {
            state.currentSurvey.data = survey
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