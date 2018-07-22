import React from 'react'
import '../css/App.css'

class Logout extends React.PureComponent {
  logout = () =>{
    const { showLogin } = this.props
    sessionStorage.removeItem("basicAuthCredentials")
    showLogin()
  }

  render() {
    return(
      <div className='LoginForm'>
          <h1>Clock following button to logout from App</h1>
          <div><button onClick={() => this.logout()}>Logout</button></div>
      </div>
    )
  }
}

export default Logout
