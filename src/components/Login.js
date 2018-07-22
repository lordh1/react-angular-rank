import React from 'react'
import '../css/App.css'

class Login extends React.Component {
  state = {
    username: '',
    password: ''
  }

  handleChangeUsername = (e) =>{
    this.setState({username: e.target.value});
  }

  handleChangePassword = (e) =>{
    this.setState({password: e.target.value});
  }

  setCredentials = (username, password) => {
    const { getcontributors, showcontributors } = this.props
    var basicAuth = 'Basic ' + btoa(username + ':' + password);
    sessionStorage.setItem("basicAuthCredentials", basicAuth)
    getcontributors()
    showcontributors()
  }

  render() {
    const { username, password } = this.state

    return(
      <div className='LoginForm'>
          <h1>Login to gitHub</h1>
          <div>Username</div>
          <div><input type='text' value={username} onChange={this.handleChangeUsername} /></div>
          <div>Password:</div>
          <div><input type='password' value={password} onChange={this.handleChangePassword} /></div>
          <div><button onClick={() => this.setCredentials(username, password)}>Submit</button></div>
      </div>
    )
  }
}

export default Login
