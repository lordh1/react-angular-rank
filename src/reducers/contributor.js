import { SET_CONTRIBUTOR } from '../actions/contributor'

export const contributor = (state = {}, action) => {
    switch (action.type) {
      case SET_CONTRIBUTOR:
        return action.contributor
      default:
        return state
    }
  }