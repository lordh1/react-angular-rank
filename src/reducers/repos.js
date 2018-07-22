import { GET_REPOS, FLUSH_REPOS } from '../actions/repos'

export const repos = (state = [], action) => {
    switch (action.type) {
      case GET_REPOS:
        return action.repos
      case FLUSH_REPOS:
        return []
      default:
        return state
    }
  }