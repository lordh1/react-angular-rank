import React from 'react'
import '../css/App.css'

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    validated: true
  }

  handleChangeUsername = (e) =>{
    this.setState({username: e.target.value});
  }

  handleChangePassword = (e) =>{
    this.setState({password: e.target.value});
  }

  testCredentials = async (basicAuth) => {
    const apiUrl = 'https://api.github.com'
    if(!basicAuth) return

    var options = {
      method: 'GET',
      headers: {
        "Authorization": basicAuth,
        "Content-Type": "application/json"
      }
    }

    var testRequest = await fetch(apiUrl, options)
    var test = await testRequest.json()
    if(test.hasOwnProperty('authorizations_url')) return true
    else return false
  }

  setCredentials = async (username, password) => {
    if(!username.trim() || !password.trim()) {
      this.setState({ validated: false })
      return
    }

    const { getcontributors, showcontributors } = this.props
    var basicAuth = 'Basic ' + btoa(username + ':' + password);

    var test = await this.testCredentials(basicAuth)
    if(test) {
      sessionStorage.setItem("basicAuthCredentials", basicAuth)
      getcontributors()
      showcontributors()
    }
    else {
      this.setState({ validated: false })
    }
  }

  render() {
    const { username, password, validated } = this.state
    let validationMessage
    if(!validated) validationMessage = "Wrong credentials"

    return(
      <div className='LoginForm'>
          <h1>Login to gitHub</h1>
          <h2>application needs authentication to GitHub API by existing account</h2>
          <div>Username</div>
          <div><input type='text' value={username} onChange={this.handleChangeUsername} /></div>
          <div>Password:</div>
          <div><input type='password' value={password} onChange={this.handleChangePassword} /></div>
          <div><button onClick={() => this.setCredentials(username, password)}>Submit</button></div>
          <div className='Error'>{validationMessage}</div>
      </div>
    )
  }
}

export default Login
