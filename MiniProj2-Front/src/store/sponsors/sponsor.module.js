import sponsorService from "@/api/sponsor.service";
import { 
  // Actions
  FETCH_SPONSORS,
  FETCH_SPONSOR,
  ADD_SPONSOR, 
  EDIT_SPONSOR, 
  REMOVE_SPONSOR, 
  // Mutations
  SET_SPONSORS,
  SET_SPONSOR,
  SET_MESSAGE
} from "./sponsor.constants";

const state = {
  sponsors: [],
  currentSponsor: null,
  message: ""
};

const getters = {
  getSponsors: state => state.sponsors,
  getSponsorById: state => id => state.sponsors.find(sponsor => sponsor._id === id),
  getCurrentSponsor: state => state.currentSponsor,
  getMessage: state => state.message
};

const actions = {
  [FETCH_SPONSORS]: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      sponsorService.getSponsors(rootState.auth.token)
        .then(
          res => {
            commit(SET_SPONSORS, res.body);
            resolve(res)
          },
          err => {
            commit(SET_MESSAGE, err.message)
            reject(err)
          });
    })
  },
  [FETCH_SPONSOR]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      sponsorService.getSponsor(rootState.auth.token, id)
        .then(
          res => {
            commit(SET_SPONSOR, res.body);
            resolve(res)
          },
          err => {
            commit(SET_MESSAGE, err.message)
            reject(err)
          });
    })
  },
  [ADD_SPONSOR]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      sponsorService.addSponsor(rootState.auth.token, payload)
        .then(
          res => {
            commit(SET_MESSAGE, `O patrocinador ${res.body.name} foi adicionado com sucesso!`);
            resolve(res)
          }, err => {
            commit(SET_MESSAGE, err.message)
            reject(err)
          });
    });
  },
  [EDIT_SPONSOR]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      sponsorService.editSponsor(rootState.auth.token, payload)
        .then(
          res => {
            commit(SET_MESSAGE, `O patrocinador ${res.body.name} foi atualizado com sucesso!`);
            resolve(res)
          }, err => {
            commit(SET_MESSAGE, err)
            reject(err)
          });
    });
  },
  [REMOVE_SPONSOR]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      sponsorService.removeSponsor(rootState.auth.token, id)
        .then(res => {
          commit(SET_MESSAGE, `O patrocinador foi removido com sucesso!`);
          resolve(res)
        }, err => {
          commit(SET_MESSAGE, err.message)
          reject(err)
        });
    });
  }
};

export const mutations = {
  [SET_SPONSORS]: (state, sponsors) => {
    state.sponsors = sponsors;
  },
  [SET_SPONSOR]: (state, sponsor) => {
    state.currentSponsor = sponsor;
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
