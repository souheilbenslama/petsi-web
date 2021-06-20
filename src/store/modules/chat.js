import axios from 'axios'
import { apiUrl } from '../../constants/config'
import store from '../index'

const state = {
  isLoadContacts: false,
  isLoadConversations: false,
  error: '',
  contacts: null,
  contactsSearchResult: null,
  conversations: null
}

const getters = {
  isLoadContacts: state => state.isLoadContacts,
  isLoadConversations: state => state.isLoadConversations,
  error: state => state.error,
  contacts: state => state.contacts,
  conversations: state => state.conversations,
  contactsSearchResult: state => state.contactsSearchResult

}

const mutations = {
  getContactsSuccess(state, payload) {
    state.isLoadContacts = true
    state.contacts = payload.contacts
    state.contactsSearchResult = payload.contacts
  },
  getContactsSearchSuccess(state, payload) {
    state.contactsSearchResult = payload.contacts
  },
  getContactsError(state, error) {
    state.isLoadContacts = false
    state.error = error
  },
  getConversationsSuccess(state, payload) {
    state.isLoadConversations = true
    state.conversations = payload.conversations
  },
  getConversationsError(state, error) {
    state.isLoadConversations = false
    state.error = error
  }
}

const actions = {
  searchContacts({ commit, state }, { userId, searchKey }) {
    if(searchKey.length > 0){
      let filtered = state.contacts.filter(contact => {
        return (contact.name + ' ' + contact.surname).includes(searchKey)
      })
      console.log(filtered)
      commit('getContactsSearchSuccess', { contacts: filtered, userId: userId })
    } else {
      commit('getContactsSearchSuccess', { contacts: state.contacts, userId: userId })
    }
       
    /*if (searchKey.length > 0) {
      axios
        .get(`${apiUrl}/contacts?search=${searchKey}`)
        .then(r => r.data)
        .then(res => {
          if (res.status) {
            commit('getContactsSearchSuccess', { contacts: res.data, userId: userId })
          } else {
            commit('getContactsError', 'error:getContacts')
          }
        })
    } else {
      commit('getContactsSearchSuccess', { contacts: state.contacts, userId: userId })
    }*/
  },
  getContacts({ commit }, userId) {
    const accessToken = store.getters.token
   axios
      .get('http://stark-cliffs-03208.herokuapp.com/getUsers',{headers: {authorization: accessToken}})
      .then(res => {
        commit('getContactsSuccess', { contacts: res.data, userId: userId })
      })
      .catch(e => {
        commit('getContactsError', 'error:getContacts')
      })
   
   /* axios
      .get(`${apiUrl}/contacts`)
      .then(r => r.data)
      .then(res => {
        if (res.status) {
          commit('getContactsSuccess', { contacts: res.data, userId: userId })
        } else {
          commit('getContactsError', 'error:getContacts')
        }
      })*/
  },
  getConversations({ commit }, userId) {
    const accessToken = store.getters.token
    axios
       .get('http://stark-cliffs-03208.herokuapp.com/messages',{headers: {authorization: accessToken}})
       .then(res => {
         commit('getConversationsSuccess', { conversations: [], userId: userId })
       })
       .catch(e => {
        alert('h')
        commit('getConversationsError', 'error:getConversations')
       })


       /*
    axios
      .get(`${apiUrl}/conversations`)
      .then(r => r.data)
      .then(res => {
        if (res.status) {
          commit('getConversationsSuccess', { conversations: res.data, userId: userId })
        } else {
          commit('getConversationsError', 'error:getConversations')
        }
      })*/
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
