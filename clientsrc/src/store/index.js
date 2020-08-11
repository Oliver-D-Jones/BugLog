import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { api } from "./AxiosService"

Vue.use(Vuex);



export default new Vuex.Store({
  state: {
    profile: {},
    bugs: [],
    activeBug: {},
    activeNotes: [],
    notes: [],
    page: {},
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBugs(state, bugs) {
      state.bugs = bugs
    },
    addBug(state, bug) {
      state.bugs.unshift(bug)
    },
    removeBug(state, bugId) {
      let index = state.bugs.findIndex(b => b.id == bugId)
      state.bugs.splice(index, 1)
    },
    setActiveBug(state, bug) {
      state.activeBug = bug
    },
    setNotes(state, notes) {
      state.notes = notes
    },
    setActiveNotes(state, notes) {
      state.activeNotes = notes
    },
    addActiveNote(state, note) {
      state.activeNotes.unshift(note)
    },
    addNote(state, note) {
      // let index = state.bugs.findIndex(b=>b.id == note.bug)
      state.notes.unshift(note)
    },
    removeNote(state, noteId) {
      let index = state.notes.findIndex(n => n.id == noteId)
      state.notes.splice(index, 1)
    },
    removeActiveNote(state, noteId) {
      let index = state.activeNotes.findIndex(n => n.id == noteId)
      state.activeNotes.splice(index, 1)
    },
    setPages(state, total, current) {
      state.page = { total: total, current: current }
    }
  },
  actions: {
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    // async getPage({commit}){
    //   try {
    //     let bugs = await api.getPage("bug");
    //     console.log(bugs);

    //   } catch (error) {
    //     console.log(error);
    //   }

    // }, 
    //#region -- BUGS --
    getBugs({ commit, dispatch }, page) {
      const limit = 5;
      api.get('bug/', { params: { page, limit } })
        .then(res => {
          commit('setBugs', res.data.bugs);
          commit("setPages", res.data.totalPages, res.data.currentPage)
        })
    },

    addBug(context, bugData) {
      api.post('bug/', bugData)
        .then(res => {
          context.commit("addBug", res.data)
          context.commit("setActiveBug", res.data)
          context.dispatch("saveStateToLocal")
          router.push({ name: "Bug", params: { id: res.data.id } });
        })
    },
    getActiveBug(context, path) {
      api.get(path)
        .then(res => {
          context.commit("setActiveBug", res.data)
          context.dispatch("saveStateToLocal")
        })
    },
    closeBug({ commit, dispatch }, bugData) {
      api.put('bug/' + bugData._id, bugData)
        .then(res => {
        })
    },
    deleteBug({ commit, dispatch }, bugId) {
      api.delete('bug/' + bugId)
        .then(res => {
          commit("removeBug", bugId)
        })
    },
    deleteBugs(context) {
      api.delete('bug/')
        .then(res => {
          context.dispatch("getBugs")
        })
    },

    //#region -- Notes ---

    getAllNotes({ commit }, bugId) {
      api.get("note/")
        .then(res => {
          commit('setNotes', res.data)
        })
    },
    getNotes(context, bugId) {
      console.log("gN", bugId)
      api.get("bug/" + bugId + "/note")
        .then(res => {
          console.log("getNotes", res.data);
          context.commit('setActiveNotes', res.data);
          context.dispatch("saveStateToLocal")

        })
    },
    // getActiveNotes({ commit }, bugId) {
    //   api.get('bug/' + bugId + "/note")
    //     .then(res => {
    //       commit('setActiveNotes', res.data)
    //     })
    // },
    addActiveNote({ commit,dispatch }, bugData) {
      api.post('note/', bugData)
        .then(res => {
          commit("addActiveNote", res.data)
          commit("addNote", res.data)
          console.log(res.data);
          dispatch("saveStateToLocal")
        })
    },
    addNote({ commit }, bugData) {
      api.post('note/', bugData)
        .then(res => {
          commit("addNote", res.data)
        })
    },
    deleteNote({ commit, dispatch }, noteId) {
      api.delete('note/' + noteId)
        .then(res => {
          commit("removeNote", noteId)
        })
    },
    deleteActiveNote({ commit, dispatch }, noteId) {
      api.delete('note/' + noteId)
        .then(res => {
          commit("removeActiveNote",noteId)
        })
    },
    getStateFromLocal({ commit }) {
      let data = JSON.parse(window.localStorage.getItem("Bug"));
      if (data) {
        commit("setActiveBug", data.activeBug)
        commit("setActiveNotes", data.activeNotes)
      }
    },
    saveStateToLocal({ state }) {
      let save = { activeBug: state.activeBug, activeNotes: state.activeNotes }
      window.localStorage.setItem("Bug", JSON.stringify(save))
    },
  }
});
