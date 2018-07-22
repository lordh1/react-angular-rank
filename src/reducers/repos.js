import {GET_REPOS } from '../actions/repos'

export const repos = (state = [], action) => {
    switch (action.type) {
      case GET_REPOS:
        return action.repos
      default:
        return state
    }
  }