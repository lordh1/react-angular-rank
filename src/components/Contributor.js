import React from 'react'
import PropTypes from 'prop-types'
import '../css/App.css'

const Contributor = ({contributor, repos, setrepo}) => (
  <div>
      <h1>Contributor data</h1>
      <div><img className='Photo' src={contributor.avatar_url} alt='' /></div>
      <div><div className='DetailLabel'>Name:</div><div className='Detail'>{contributor.name}</div></div>
      <div><div className='DetailLabel'>Number of followers:</div><div className='Detail'>{contributor.followers}</div></div>
      <div><div className='DetailLabel'>Number of public repos:</div><div className='Detail'>{contributor.public_repos}</div></div>
      <div><div className='DetailLabel'>Number of public gists:</div><div className='Detail'>{contributor.public_gists}</div></div>
      <table>
        <thead>
          <tr><th className="NoWordWrap">No.</th><th>Repo name</th></tr>
        </thead>
        <tbody>
        {repos.map((repo, i) =>
          <tr key={i} onClick={() => setrepo(repo) }><td className="NoWordWrap">{i + 1}</td><td>{repo.full_name}</td></tr>
        )}
        </tbody>
      </table>
  </div>
)

Contributor.propTypes = {
  contributor: PropTypes.object.isRequired
}

export default Contributor
