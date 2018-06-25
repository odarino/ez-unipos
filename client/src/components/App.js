import React, { Component } from 'react';
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import './App.scss';
import Dropdown from './Select';
import { getUserInfo, forceLoading, sendMessage, eraseMessage } from '../actions';
import Loader from './Loader';

library.add(faHeart)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userTo: {},
      hasError: false,
      error: '',
      userToken: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if(window.localStorage.getItem("authnToken") !== null) {
      this.props.getUserInfo(window.localStorage.getItem("authnToken"))
      this.setState({ 
        userToken: window.localStorage.getItem("authnToken")
      })
    }
  }

  onInputToken = (e) => {
    if(e.keyCode === 13) {
      window.localStorage.setItem("authnToken", e.currentTarget.value)
      this.props.getUserInfo(e.currentTarget.value)
      this.props.forceLoading()
    }
  }

  handleSubmit = () => {
    this.props.eraseMessage()
    this.props.sendMessage({
      userFrom: this.props.user.result.member.id,
      userTo: this.state.userTo.id,
      points: this.refs.points.value,
      messages: this.state.coreValue + " " + this.refs.messages.value ? this.refs.messages.value : ''
    }, this.refs.token.value)
  }

  selectUserInfo = (user) => {
    if(!user) this.setState({ userTo: {} })
    else this.setState({ userTo: user })
  }

  selectCoreValue = (value) => {
    if(!value) this.setState({ coreValue: '' })
    else this.setState({ coreValue: value })
  }

  render() {
    return (
      <div className="container container-wrapper">
        <div className="row justify-content-center">
          <div className="col-md-6">

            {
              this.props.user.loadingInfo ? <Loader/> : null
            }

            <div className="people">
            {
              Object.keys(this.props.user.result).length > 0 && 
              <div className="user-info">
                <div className="from">From: {this.props.user.result.member.display_name}</div>
                <div className="avatar" style={{backgroundImage: `url("${this.props.user.result.member.picture_url}")`}}> 
                </div>
              </div>
            }

            {
              Object.keys(this.state.userTo).length > 0 && 
              <React.Fragment>
                <FontAwesomeIcon icon="heart" /> 
                <div className="user-info">
                  <div className="to">To: {this.state.userTo.display_name}</div>
                  <div className="avatar" style={{backgroundImage: `url("${this.state.userTo.picture_url}")`}}> 
                  </div>
                </div>
              </React.Fragment>
            }
            </div>

            <div className="form-group">
              <label htmlFor="access-token">Your token: </label>
              <input type="text" className="form-control" id="access-token" ref="token" placeholder="Enter your token" 
                onKeyDown={this.onInputToken} defaultValue={this.state.userToken}
              />
              <small id="points" className="form-text text-muted">Just type once! </small>
            </div>

            <div className="form-group">
              <label>To: </label>
              <Dropdown selectUserInfo={this.selectUserInfo}/>
            </div>

            <div className="form-group">
              <label>Core value: </label>
              <Dropdown selectCoreValue={this.selectCoreValue} type="core-value"/>
            </div>

            <div className="form-group">
              <label htmlFor="points">Points: </label>
              <input type="number" ref="points" className="form-control" id="points" 
                placeholder="Enter your desired points" min="1" max="400"/>
              <small id="points" className="form-text text-muted">If you type >400, I will automatically add 400 points to opponents.</small>
            </div>
            
            <div className="form-group">
              <label htmlFor="messages">Message (any): </label>
              <input id="messages" ref="messages" className="form-control" name="message" 
                cols="60" rows="5" placeholder="Thank you for your cooperation"/>
            </div>
            <div className="error">
              {this.props.user.message}
            </div>
            <button className="btn btn-primary m-t-10" onClick={this.handleSubmit}> Send </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.toJS()
  }
}

export default connect(mapStateToProps, { getUserInfo, forceLoading, sendMessage, eraseMessage })(App);
