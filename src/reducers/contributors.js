import { GET_CONTRIBUTORS } from '../actions/contributors'
import { FLUSH_CONTRIBUTORS } from '../actions/contributors'
import { SET_ANGULARCOUNTER } from '../actions/contributors'
import { CONTRIBUTORS_SORT_FOLLOWERS } from '../actions/contributors'
import { CONTRIBUTORS_SORT_REPOS } from '../actions/contributors'
import { CONTRIBUTORS_SORT_GISTS } from '../actions/contributors'

function sortByKey(array, key) {
  if(!array) return;

  return array.sort(function(b, a) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

const initState = {
    contributors: [],
    angularCounter: []
}

export const contributors = (state = initState, action) => {
    switch (action.type) {
      case GET_CONTRIBUTORS:
        return {
          contributors: [ ...state.contributors, action.contributors ],
          angularCounter: state.angularCounter
        }
      case FLUSH_CONTRIBUTORS:
        return initState
      case SET_ANGULARCOUNTER:
        return {
          contributors: state.contributors,
          angularCounter: action.angularCounter
        }
      case CONTRIBUTORS_SORT_FOLLOWERS:
        return {
          contributors: [ ...sortByKey(state.contributors, 'followers') ],
          angularCounter: state.angularCounter
        }
      case CONTRIBUTORS_SORT_REPOS:
        return {
          contributors: [ ...sortByKey(state.contributors, 'public_repos') ],
          angularCounter: state.angularCounter
        }
      case CONTRIBUTORS_SORT_GISTS:
        return {
          contributors: [ ...sortByKey(state.contributors, 'public_gists') ],
          angularCounter: state.angularCounter
        }
      default:
        return state
    }
  }