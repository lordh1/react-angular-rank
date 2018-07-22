import React from 'react'
import PropTypes from 'prop-types'
import '../css/App.css'

const Repo = ({repo, back}) => (
  <div>
      <h1>Repo data</h1>
      <div className="ButtonsArea"><button className="BackButton" onClick={back}>Back</button></div>
      <div><div className='DetailLabel'>Name:</div><div className='Detail'>{repo.name}</div></div>
      <div><div className='DetailLabel'>Full name:</div><div className='Detail'>{repo.full_name}</div></div>
      <div><div className='DetailLabel'>Web site:</div><div className='Detail'>{repo.html_url}</div></div>
      <div><div className='DetailLabel'>Clone url:</div><div className='Detail'>{repo.clone_url}</div></div>
      <div><div className='DetailLabel'>Watchers:</div><div className='Detail'>{repo.watchers_count}</div></div>
      <div><div className='DetailLabel'>Forks:</div><div className='Detail'>{repo.forks_count}</div></div>
  </div>
)

Repo.propTypes = {
  repo: PropTypes.object.isRequired
}

export default Repo
