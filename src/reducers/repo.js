import { SET_REPO } from '../actions/repo'

export const repo = (state = {}, action) => {
    switch (action.type) {
      case SET_REPO:
        return action.repo
      default:
        return state
    }
  }