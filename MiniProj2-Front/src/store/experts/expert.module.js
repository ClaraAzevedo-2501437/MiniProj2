import expertService from "@/api/expert.service";
import { 
  // Actions
  FETCH_EXPERTS,
  FETCH_EXPERT,
  ADD_EXPERT, 
  EDIT_EXPERT, 
  REMOVE_EXPERT, 
  // Mutations
  SET_EXPERTS,
  SET_EXPERT,
  SET_MESSAGE
} from "./expert.constants";

const state = {
  experts: [],
  currentExpert: null,
  message: ""
};

const getters = {
  getExperts: state => state.experts,
  getExpertById: state => id => state.experts.find(expert => expert._id === id),
  getCurrentExpert: state => state.currentExpert,
  getMessage: state => state.message
};

const actions = {
  [FETCH_EXPERTS]: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      expertService.getExperts(rootState.auth.token)
        .then(
          res => {
            commit(SET_EXPERTS, res.body);
            resolve(res)
          },
          err => {
            commit(SET_MESSAGE, err.message)
            reject(err)
          });
    })
  },
  [FETCH_EXPERT]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      expertService.getExpert(rootState.auth.token, id)
        .then(
          res => {
            commit(SET_EXPERT, res.body);
            resolve(res)
          },
          err => {
            commit(SET_MESSAGE, err.message)
            reject(err)
          });
    })
  },
  [ADD_EXPERT]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      expertService.addExpert(rootState.auth.token, payload)
        .then(
          res => {
            commit(SET_MESSAGE, `O especialista ${res.body.name} foi adicionado com sucesso!`);
            resolve(res)
          }, err => {
            commit(SET_MESSAGE, err.message)
            reject(err)
          });
    });
  },
  [EDIT_EXPERT]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      expertService.editExpert(rootState.auth.token, payload)
        .then(
          res => {
            commit(SET_MESSAGE, `O especialista ${res.body.name} foi atualizado com sucesso!`);
            resolve(res)
          }, err => {
            commit(SET_MESSAGE, err)
            reject(err)
          });
    });
  },
  [REMOVE_EXPERT]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      expertService.removeExpert(rootState.auth.token, id)
        .then(res => {
          commit(SET_MESSAGE, `O especialista foi removido com sucesso!`);
          resolve(res)
        }, err => {
          commit(SET_MESSAGE, err.message)
          reject(err)
        });
    });
  }
};

export const mutations = {
  [SET_EXPERTS]: (state, experts) => {
    state.experts = experts;
  },
  [SET_EXPERT]: (state, expert) => {
    state.currentExpert = expert;
  },
  [SET_MESSAGE]: (state, message) => {
    state.message = message;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
