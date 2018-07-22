export const GET_CONTRIBUTORS = 'GET_CONTRIBUTORS'
export const CONTRIBUTORS_SORT_FOLLOWERS = 'CONTRIBUTORS_SORT_FOLLOWERS'
export const CONTRIBUTORS_SORT_REPOS = 'CONTRIBUTORS_SORT_REPOS'
export const CONTRIBUTORS_SORT_GISTS = 'CONTRIBUTORS_SORT_GISTS'

export const ReceiveContributors = (contributors) => ({
  type: GET_CONTRIBUTORS,
  contributors: contributors
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

export const FetchContributors = () => dispatch => {
  var basicAuth = sessionStorage.getItem("basicAuthCredentials")
  if(!basicAuth) return

  var options = {
    method: 'GET',
    headers: {
      "Authorization": basicAuth,
      "Content-Type": "application/json"
    }
  };

  fetch(apiUrl, options)
    .then(response => response.json())
    .then(data => data.map(repo =>
      fetch(repo.contributors_url, options)
      .then(response => response.json())
      .then(data => data.map(contributor => {
        fetch(contributor.url, options)
        .then(response => response.json())
        .then(user => {
          dispatch(ReceiveContributors(user))
        })
        return true
      }))
    ))
    .catch(error => {
      throw(error)
    })
}


