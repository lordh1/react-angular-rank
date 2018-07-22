import { GET_CONTRIBUTORS } from '../actions/contributors'
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

export const contributors = (state = [], action) => {
    switch (action.type) {
      case GET_CONTRIBUTORS:
        return [ ...state, action.contributors ]
      case CONTRIBUTORS_SORT_FOLLOWERS:
        return [ ...sortByKey(state, 'followers') ]
      case CONTRIBUTORS_SORT_REPOS:
        return [ ...sortByKey(state, 'public_repos') ]
      case CONTRIBUTORS_SORT_GISTS:
        return [ ...sortByKey(state, 'public_gists') ]
      default:
        return state
    }
  }