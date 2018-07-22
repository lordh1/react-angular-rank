export const GET_REPOS = 'GET_REPOS'
export const FLUSH_REPOS = 'FLUSH_REPOS'

export const GetRepos = (repos) => ({
  type: GET_REPOS,
  repos: repos
})

export const FlushRepos = () => ({
  type: FLUSH_REPOS
})

export const FetchRepos = (reposUrl) => dispatch => {
  var basicAuth = sessionStorage.getItem("basicAuthCredentials")

  var options = {
    method: 'GET',
    headers: {
      "Authorization": basicAuth,
      "Content-Type": "application/json"
    }
  }

  fetch(reposUrl, options)
    .then(response => response.json())
    .then(repos => dispatch(GetRepos(repos)))
    .catch(error => {
      throw(error)
    })
}


