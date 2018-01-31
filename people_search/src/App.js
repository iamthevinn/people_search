import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux'
import { SEARCH_USER, GO_BACK_TO_SEARCH, UPDATE_MATCHING_USERS, UPDATE_INPUT_TEXT } from './index.js';

const DisplayUser = (props) => {
  const { name, city, industry, hobbies, email } = props.displayedUser;
  return <div>
    <div className="backButton">
      <a href="" onClick={props.backToSearch}>Back</a>
    </div>
    <div className="displayUserInfo">
      <h1>{name}</h1>
      <div>City: {city}</div>
      <div>Industry: {industry}</div>
      <div>Hobbies: {hobbies}</div>
      <div>Email: {email}</div>
    </div>
  </div>
}

const mapStateToPropsForDisplayUser = (state) => {
  return {
    displayedUser: state.displayedUser
  }
}


const mapDispatchToPropsForDisplayUser = (dispatch) => {
  return {
    backToSearch(e) {
      e.preventDefault();
      dispatch({ type: GO_BACK_TO_SEARCH })
    }
  }
}

const DisplayUserWrapped = connect(mapStateToPropsForDisplayUser,mapDispatchToPropsForDisplayUser)(DisplayUser)

const SearchUser = (props) => {
  const { showUserInfo } = props;
  let listContainer = null;
  if (props.users.length) {
    const listContents = props.users.map((user) => (<div key={user.id} onClick={() => showUserInfo(user)}>{user.name}</div>))
    listContainer = <div className="filteredList">{listContents}</div>
  }

  function changingInputText(event) {
    props.updateMatchingList(event.target.value)
    props.updateInputValue(event.target.value)
  }

  return <div>
    <div className="searchBox">
      <input onChange={changingInputText} value={props.inputText} placeholder="Enter a username" />
    </div>
    <div className="listOfUsers">
      {listContainer}
    </div>
  </div>
}

const mapStateToPropsForSearchUser = (state) => {
  return {
    users: state.users,
    inputText: state.inputText
  }
}


const mapDispatchToPropsForSearchUser = (dispatch) => {
  return {
    showUserInfo(user) {
      dispatch({ type: SEARCH_USER, payload: user})
    },
    updateInputValue(text) {
      dispatch({ type: UPDATE_INPUT_TEXT, payload: text})
    },
    updateMatchingList(substring) {
      dispatch({ type: UPDATE_MATCHING_USERS, payload: substring})
    }
  }
}

const SearchUserWrapped = connect(mapStateToPropsForSearchUser, mapDispatchToPropsForSearchUser)(SearchUser);

class App extends Component {
  constructor(props) {
    super(props);
  }


  render() {

   let app = <SearchUserWrapped />
    if (this.props.displayedUser)
      app = <DisplayUserWrapped />

    return (
      <div className="App">
        {app}
      </div>
    );
  }
}


const mapStateToPropsForApp = (state) => {
  return {
    displayedUser: state.displayedUser
  }
}


export default connect(mapStateToPropsForApp)(App)
