import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  FetchContributors,
  ContributorsSortFollowers,
  ContributorsSortRepos,
  ContributorsSortGists
} from '../actions/contributors'
import { SetContributor } from '../actions/contributor'
import { FetchRepos } from '../actions/repos'
import Contributors from '../components/Contributors'
import Contributor from '../components/Contributor'
import Login from '../components/Login'
import '../css/App.css'

class App extends Component {
  static propTypes = {
    contributors: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  state = {
    activeTab: 'contributors'
  }

  componentDidMount() {
    this.getContributors()
  }

  getContributors = () => {
    const { dispatch } = this.props
    dispatch(FetchContributors())
  }

  showContributors = () => {
    this.setState({activeTab: 'contributors'})
  }

  showLogin = () => {
    this.setState({activeTab: 'login'})
  }

  contributorsSortFollowers = () => {
    const { dispatch } = this.props
    dispatch(ContributorsSortFollowers())
  }

  contributorsSortRepos = () => {
    const { dispatch } = this.props
    dispatch(ContributorsSortRepos())
  }

  contributorsSortGists = () => {
    const { dispatch } = this.props
    dispatch(ContributorsSortGists())
  }

  setContributor = (contributor) => {
    const { dispatch } = this.props
    dispatch(FetchRepos(contributor.repos_url))
    dispatch(SetContributor(contributor))
    this.setState({activeTab: 'contributor'})
  }

  render() {
    const { contributors, contributor, repos } = this.props
    const { activeTab } = this.state

    let tab
    if(activeTab === 'contributors') {
      tab = <Contributors
              contributors={contributors}
              sortfollowers={this.contributorsSortFollowers}
              sortrepos={this.contributorsSortRepos}
              sortgists={this.contributorsSortGists}
              setcontributor={this.setContributor}
            />
    } else if(activeTab === 'contributor') {
      tab = <Contributor contributor={contributor} repos={repos}/>
    } else if(activeTab === 'login') {
      tab = <Login getcontributors={this.getContributors} showcontributors={this.showContributors} />
    }


    return (
      <div className='Main'>
        <div className='Flex'>
          <button onClick={this.showLogin}>Login</button>
          <button onClick={this.showContributors}>Contributors</button>
        </div>
        <div>
          {tab}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { contributors, contributor, repos } = state

  return {
    contributors,
    contributor,
    repos
  }
}

export default connect(mapStateToProps)(App)
