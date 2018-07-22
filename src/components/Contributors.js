import React from 'react'
import PropTypes from 'prop-types'
import '../css/App.css'

class Contributors extends React.PureComponent {
  render() {
   const { contributors, sortangularrepos, sortfollowers, sortrepos, sortgists, setcontributor } = this.props
    let fetching
    if(contributors.isFetching) fetching = <img src="img/loading.gif" alt="loading..." />

   return (
      <div>
          <h1>Angular challenge {fetching}</h1>
          <div className='Sorting'>
          <h2>list of Angular contributors</h2>
            <button onClick={sortangularrepos} disabled={contributors.isFetching}>Sort by Angular repos</button>
            <button onClick={sortfollowers}>Sort by followers</button>
            <button onClick={sortrepos}>Sort by repos</button>
            <button onClick={sortgists}>Sort by gists</button>
          </div>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>User</th>
              <th>Angular repos</th>
              <th>Followers</th>
              <th>Public repos</th>
              <th>Public gists</th>
            </tr>
          </thead>
          <tbody>
          {contributors.contributors.map((ctr, i) =>
            <tr key={i} onClick={() => setcontributor(ctr) }>
              <td>{i + 1}</td>
              <td>{ctr.name} ({ctr.login})</td>
              <td>{ctr.angular_counter || "loading..."}</td>
              <td>{ctr.followers}</td>
              <td>{ctr.public_repos}</td>
              <td>{ctr.public_gists}</td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    )
  }
}

Contributors.propTypes = {
  contributors: PropTypes.object.isRequired
}

export default Contributors
