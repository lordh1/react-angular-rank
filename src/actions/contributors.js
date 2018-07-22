export const GET_CONTRIBUTORS = 'GET_CONTRIBUTORS'
export const FLUSH_CONTRIBUTORS = 'FLUSH_CONTRIBUTORS'
export const SET_ANGULARCOUNTER = 'SET_ANGULARCOUNTER'
export const SET_FETCHING = 'SET_FETCHING'
export const CONTRIBUTORS_SORT_ANGULARREPOS = 'CONTRIBUTORS_SORT_ANGULARREPOS'
export const CONTRIBUTORS_SORT_FOLLOWERS = 'CONTRIBUTORS_SORT_FOLLOWERS'
export const CONTRIBUTORS_SORT_REPOS = 'CONTRIBUTORS_SORT_REPOS'
export const CONTRIBUTORS_SORT_GISTS = 'CONTRIBUTORS_SORT_GISTS'

export const ReceiveContributors = (contributor) => ({
  type: GET_CONTRIBUTORS,
  contributor: contributor
})

export const FlushContributors = () => ({
  type: FLUSH_CONTRIBUTORS
})

export const SetAngularCounter = (angularCounter) => ({
  type: SET_ANGULARCOUNTER,
  angularCounter: angularCounter
})

export const SetFetching = (value) => ({
  type: SET_FETCHING,
  isFetching: value
})

export const ContributorsSortAngularRepos = () => ({
  type: CONTRIBUTORS_SORT_ANGULARREPOS
})

export const ContributorsSortFollowers = () => ({
  type: CONTRIBUTORS_SORT_FOLLOWERS
})

export const ContributorsSortRepos = () => ({
  type: CONTRIBUTORS_SORT_REPOS
})

export const ContributorsSortGists = () => ({
  type: CONTRIBUTORS_SORT_GISTS
})

const apiUrl = 'https://api.github.com/users/angular/repos'

export const FetchContributors = () => async (dispatch) => {
  var basicAuth = sessionStorage.getItem("basicAuthCredentials")
  if(!basicAuth) return

  var options = {
    method: 'GET',
    headers: {
      "Authorization": basicAuth,
      "Content-Type": "application/json"
    }
  };

  const reposRequest = await fetch(apiUrl, options)
  const repos = await reposRequest.json()

  var usedContributors = []
  var angularCounter = []

  var reposLength = repos.length
  var r = 0

  for (var repo of repos) {
    var contributorsRequest = await fetch(repo.contributors_url, options)
    var contributors = await contributorsRequest.json()

    for (var contributor of contributors) {
      var userRequest = await fetch(contributor.url, options)
      var user = await userRequest.json()
      angularCounter[user.id] = (parseInt(angularCounter[user.id], 10) || 0) + 1
      if(!usedContributors.includes(user.id)) {
        usedContributors.push(user.id)
        dispatch(ReceiveContributors(user))
      }
    }
    r++
    if(r === reposLength) {
      dispatch(SetAngularCounter(angularCounter))
      dispatch(SetFetching(false))
    }
  }
}


