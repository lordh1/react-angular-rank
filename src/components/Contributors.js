import React from 'react'
import PropTypes from 'prop-types'
import '../css/App.css'

const Contributors = ({contributors, sortfollowers, sortrepos, sortgists, setcontributor }) => (
  <div>
      <h1>Angular challenge</h1>
      <div className='Sorting'>
        <button onClick={sortfollowers}>Sort by followers</button>
        <button onClick={sortrepos}>Sort by repos</button>
        <button onClick={sortgists}>Sort by gists</button>
      </div>
    <table>
      <thead>
        <tr>
          <th>No.</th>
          <th>ID</th>
          <th>Avatar</th>
          <th>Followers</th>
          <th>Public repos</th>
          <th>Public gists</th>
        </tr>
      </thead>
      <tbody>
      {contributors.contributors.map((ctr, i) =>
        <tr key={i} onClick={() => setcontributor(ctr) }>
          <td>{i + 1}</td>
          <td>{ctr.id}</td>
          <td><img className='Avatar' alt='' src={ctr.avatar_url} /></td>
          <td>{ctr.followers}</td>
          <td>{ctr.public_repos}</td>
          <td>{ctr.public_gists}</td>
        </tr>
      )}
      </tbody>
    </table>
  </div>
)

Contributors.propTypes = {
  contributors: PropTypes.object.isRequired
}

export default Contributors
