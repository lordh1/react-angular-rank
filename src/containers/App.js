import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  FetchContributors,
  FlushContributors,
  SetFetching,
  ContributorsSortAngularRepos,
  ContributorsSortFollowers,
  ContributorsSortRepos,
  ContributorsSortGists
} from '../actions/contributors'
import { SetContributor } from '../actions/contributor'
import { FetchRepos, FlushRepos } from '../actions/repos'
import { SetRepo } from '../actions/repo'
import Contributors from '../components/Contributors'
import Contributor from '../components/Contributor'
import Repo from '../components/Repo'
import Login from '../components/Login'
import Logout from '../components/Logout'
import '../css/App.css'

class App extends Component {
  static propTypes = {
    contributors: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  state = {
    activeTab: 'contributors',
    authenticated: false
  }

  componentDidMount() {
    this.getContributors()
  }

  getContributors = () => {
    let basicAuth = sessionStorage.getItem("basicAuthCredentials")
    if(!basicAuth) {
      this.setState({authenticated: false})
      this.showLogin()
      return
    }

    this.setState({authenticated: true})

    const { dispatch } = this.props
    dispatch(SetFetching())
    dispatch(FlushContributors())
    dispatch(FetchContributors())
  }

  showContributors = () => {
    this.setState({activeTab: 'contributors'})
  }

  showLogin = () => {
    const { dispatch } = this.props
    dispatch(FlushContributors())
    this.setState({activeTab: 'login', authenticated: false})
  }

  showLogout = () => {
    this.setState({activeTab: 'logout'})
  }

  contributorsSortAngularRepos = () => {
    const { dispatch } = this.props
    dispatch(ContributorsSortAngularRepos())
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
    dispatch(FlushRepos())
    dispatch(FetchRepos(contributor.repos_url))
    dispatch(SetContributor(contributor))
    this.setState({activeTab: 'contributor'})
  }

  setRepo = (repo) => {
    const { dispatch } = this.props
    dispatch(SetRepo(repo))
    this.setState({activeTab: 'repo'})
  }

  render() {
    const { contributors, contributor, repos, repo } = this.props
    const { activeTab, authenticated } = this.state

    let tab
    if(activeTab === 'contributors') {
      tab = <Contributors
              contributors={contributors}
              sortangularrepos={this.contributorsSortAngularRepos}
              sortfollowers={this.contributorsSortFollowers}
              sortrepos={this.contributorsSortRepos}
              sortgists={this.contributorsSortGists}
              setcontributor={this.setContributor}
            />
    } else if(activeTab === 'contributor') {
      tab = <Contributor contributor={contributor} repos={repos} setrepo={this.setRepo}/>
    }  else if(activeTab === 'repo') {
      tab = <Repo repo={repo} back={() => this.setContributor(contributor)} />
    }
    else if(activeTab === 'login') {
      tab = <Login getcontributors={this.getContributors} showcontributors={this.showContributors} />
    } else if(activeTab === 'logout') {
      tab = <Logout showLogin={this.showLogin} />
    }

    let loginButton
    let contributorsButton
    if(!authenticated) {
      loginButton = <button onClick={this.showLogin}>Login</button>
    }
    else {
      loginButton = <button onClick={this.showLogout}>Logout</button>
      contributorsButton = <button onClick={this.showContributors}>Contributors</button>
    }

    return (
      <div className='Main'>
        <div className='Flex'>
          {loginButton}
          {contributorsButton}
        </div>
        <div>
          {tab}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { contributors, contributor, repos, repo } = state

  return {
    contributors,
    contributor,
    repos,
    repo
  }
}

export default connect(mapStateToProps)(App)
