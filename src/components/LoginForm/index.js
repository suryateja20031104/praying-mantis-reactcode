import {Component} from 'react'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    email: '',
    age: '',
    location: '',
    user: '',
    showSubmit: false,
    Msg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  onChangeAge = event => {
    this.setState({age: parseInt(event.target.value)})
  }

  onChangeLocation = event => {
    this.setState({location: event.target.value})
  }

  onSubmitSuccess = async () => {
    const url = 'https://praying-mantis-ms2.onrender.com/userDetailsAdd/'
    const {username, email, age, location} = this.state
    const userDetails = {
      username,
      email,
      age,
      location,
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const {userId} = data
    console.log(userId)
    this.setState({user: userId})
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmit: true, Msg: errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, email, age, location} = this.state
    const userDetails = {
      username,
      email,
      age,
      location,
    }
    const url = 'https://praying-mantis-ms1.onrender.com/userVerification'
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.text()
    if (data === 'true') {
      this.onSubmitSuccess()
    } else {
      this.onSubmitFailure('error in age or email')
    }
    console.log(data)
  }

  renderEmailField = () => {
    const {email} = this.state

    return (
      <>
        <label className="input-label" htmlFor="email">
          Email
        </label>
        <input
          type="text"
          id="email"
          className="username-input-field"
          value={email}
          onChange={this.onChangeEmail}
          placeholder="Email"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  renderAgeField = () => {
    const {age} = this.state

    return (
      <>
        <label className="input-label" htmlFor="age">
          Age
        </label>
        <input
          type="text"
          id="age"
          className="username-input-field"
          value={age}
          onChange={this.onChangeAge}
          placeholder="Age"
        />
      </>
    )
  }

  renderLocationField = () => {
    const {location} = this.state

    return (
      <>
        <label className="input-label" htmlFor="location">
          Location
        </label>
        <input
          type="text"
          id="location"
          className="username-input-field"
          value={location}
          onChange={this.onChangeLocation}
          placeholder="Location"
        />
      </>
    )
  }

  render() {
    const {showSubmit, Msg, user} = this.state
    return (
      <div className="login-form-container">
        <img
          src="https://images.yourstory.com/cs/images/companies/logo-1586419568502.jpg?fm=auto&ar=1:1&mode=fill&fill=solid&fill-color=fff"
          className="login-website-logo-mobile-img"
          alt="website logo"
        />
        <img
          src="https://images.yourstory.com/cs/images/companies/logo-1586419568502.jpg?fm=auto&ar=1:1&mode=fill&fill=solid&fill-color=fff"
          className="login-img"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6xT8V7SZKUv9FCxKTrIbiLV_bzNYoyqXnkA&usqp=CAU"
            className="login-website-logo-desktop-img"
            alt="website logo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderEmailField()}</div>
          <div className="input-container">{this.renderAgeField()}</div>
          <div className="input-container">{this.renderLocationField()}</div>
          <button type="submit" className="login-button">
            Submit
          </button>
          {showSubmit && <p className="error-message">*{Msg}</p>}
          {!showSubmit && <p className="error-message1">USER ID : {user}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
