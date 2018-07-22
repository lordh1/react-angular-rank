import React from 'react'
import PropTypes from 'prop-types'
import '../css/App.css'

const Contributor = ({contributor, repos}) => (
  <div>
      <h1>Contributor data</h1>
      <div><img className='Photo' src={contributor.avatar_url} alt='' /></div>
      <div><label>Name:</label> {contributor.name}</div>
      <div><label>Number of followers:</label> {contributor.followers}</div>
      <div><label>Number of public repos:</label> {contributor.public_repos}</div>
      <div><label>Number of public gists:</label> {contributor.public_gists}</div>
      <table>
        <thead>
          <tr><th>Repo name</th><th>Repo url</th></tr>
        </thead>
        <tbody>
        {repos.map((repo, i) =>
          <tr key={i}><td>{repo.full_name}</td><td>{repo.url}</td></tr>
        )}
        </tbody>
      </table>
  </div>
)

Contributor.propTypes = {
  contributor: PropTypes.object.isRequired
}

export default Contributor
