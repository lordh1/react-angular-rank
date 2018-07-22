export const GET_CONTRIBUTORS = 'GET_CONTRIBUTORS'
export const FLUSH_CONTRIBUTORS = 'FLUSH_CONTRIBUTORS'
export const SET_ANGULARCOUNTER = 'SET_ANGULARCOUNTER'
export const CONTRIBUTORS_SORT_FOLLOWERS = 'CONTRIBUTORS_SORT_FOLLOWERS'
export const CONTRIBUTORS_SORT_REPOS = 'CONTRIBUTORS_SORT_REPOS'
export const CONTRIBUTORS_SORT_GISTS = 'CONTRIBUTORS_SORT_GISTS'

export const ReceiveContributors = (contributors) => ({
  type: GET_CONTRIBUTORS,
  contributors: contributors
})

export const SetAngularCounter = (angularCounter) => ({
  type: SET_ANGULARCOUNTER,
  angularCounter: angularCounter
})

export const FlushContributors = () => ({
  type: FLUSH_CONTRIBUTORS
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

const syncFetch = async (options) => {
  const reposRequest = await fetch(apiUrl, options)
  const repos = await reposRequest.json()
  var contributors = []

  for (var repo of repos) {
    let contributorsRequest = await fetch(repo.contributors_url, options)
    let contributors = await contributorsRequest.json()
    // for (var contributor of contributors) {
    //   let ctr = {
    //     id: contributor.id,
    //     avatar_url: contributor.avatar_url
    //   }
    //   contributors.push(ctr)
    //   console.log(ctr)
    // }
  }

  console.log(contributors)

}

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
  var c = 0

  for (var repo of repos) {
    var contributorsRequest = await fetch(repo.contributors_url, options)
    var contributors = await contributorsRequest.json()
    // var contributorsLength = contributors.length

    for (var contributor of contributors) {
      var userRequest = await fetch(contributor.url, options)
      var user = await userRequest.json()
      angularCounter[user.id] = (parseInt(angularCounter[user.id], 10) || 0) + 1
      if(!usedContributors.includes(user.id)) {
        usedContributors.push(user.id)
        dispatch(ReceiveContributors(user))
        // console.log(c)
      }
      c++
    }
    r++
    if(r === reposLength) {
      console.log(angularCounter)
      // dispatch(SetAngularCounter(angularCounter))
      // dispatch(ReceiveContributors(allContributors))
    }
  }

  // syncFetch(options)

  // fetch(apiUrl, options)
  //   .then(response => response.json())
  //   .then(data => data.map(async(repo) =>
  //     fetch(repo.contributors_url, options)
  //     .then(response => response.json())
  //     .then(data => data.map(contributor => {
  //       fetch(contributor.url, options)
  //       .then(response => response.json())
  //       .then(user => {
  //         dispatch(ReceiveContributors(user))
  //       })
  //       return true
  //     }))
  //   ))
  //   .catch(error => {
  //     throw(error)
  //   })
}


