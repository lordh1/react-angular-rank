import {
  GET_CONTRIBUTORS,
  FLUSH_CONTRIBUTORS,
  SET_FETCHING,
  SET_ANGULARCOUNTER,
  CONTRIBUTORS_SORT_ANGULARREPOS,
  CONTRIBUTORS_SORT_FOLLOWERS,
  CONTRIBUTORS_SORT_REPOS,
  CONTRIBUTORS_SORT_GISTS
} from '../actions/contributors'

function sortByKey(array, key) {
  if(!array) return;

  return array.sort(function(b, a) {
      var x = a[key]
      var y = b[key]
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

function mergeAngularCounter(contributors, angularCounter) {
  let newArray = []

  for(var ctr of contributors) {
    if(typeof angularCounter[ctr.id] !== 'undefined') ctr.angular_counter = angularCounter[ctr.id]
    newArray.push(ctr)
  }

  return newArray
}

const initState = {
    contributors: [],
    angularCounter: [],
    isFetching: true
}

export const contributors = (state = initState, action) => {
    switch (action.type) {
      case GET_CONTRIBUTORS:
        return {
          contributors: [ ...state.contributors, action.contributor ],
          angularCounter: state.angularCounter,
          isFetching: state.isFetching
        }
      case FLUSH_CONTRIBUTORS:
        return initState
      case SET_FETCHING:
        return {
          contributors: state.contributors,
          angularCounter: state.angularCounter,
          isFetching: action.isFetching
        }
      case SET_ANGULARCOUNTER:
        return {
          contributors: mergeAngularCounter(state.contributors, action.angularCounter),
          angularCounter: action.angularCounter,
          isFetching: state.isFetching
        }
      case CONTRIBUTORS_SORT_ANGULARREPOS:
        return {
          contributors: [ ...sortByKey(state.contributors, 'angular_counter') ],
          angularCounter: state.angularCounter,
          isFetching: state.isFetching
        }
      case CONTRIBUTORS_SORT_FOLLOWERS:
        return {
          contributors: [ ...sortByKey(state.contributors, 'followers') ],
          angularCounter: state.angularCounter,
          isFetching: state.isFetching
        }
      case CONTRIBUTORS_SORT_REPOS:
        return {
          contributors: [ ...sortByKey(state.contributors, 'public_repos') ],
          angularCounter: state.angularCounter,
          isFetching: state.isFetching
        }
      case CONTRIBUTORS_SORT_GISTS:
        return {
          contributors: [ ...sortByKey(state.contributors, 'public_gists') ],
          angularCounter: state.angularCounter,
          isFetching: state.isFetching
        }
      default:
        return state
    }
  }