import React from 'react';
import './App.css';
import {connect} from 'react-redux'
import { SEARCH_USER, GO_BACK_TO_SEARCH, UPDATE_MATCHING_USERS, UPDATE_INPUT_TEXT } from './index.js';
import PropTypes from 'prop-types';

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

/*DisplayUser.propTypes = {
  name: PropTypes.string,
  city: PropTypes.string,
  industry: PropTypes.string,
  hobbies: PropTypes.string,
  email: PropTypes.string,
  displayedUser: PropTypes.object,
  backToSearch: PropTypes.func
}*/

DisplayUser.propTypes = {
  displayedUser: PropTypes.shape({
    name: PropTypes.string,
    city: PropTypes.string,
    industry: PropTypes.string,
    hobbies: PropTypes.string,
    email: PropTypes.string,
    displayedUser: PropTypes.object,
    backToSearch: PropTypes.func
  })
}

const SearchUser = (props) => {
  const { showUserInfo, updateMatchingList, updateInputValue, users, inputText} = props;
  let listContainer = null;
  if (users.length) {
    const listContents = users.map((user) => (<div key={user.id} onClick={() => showUserInfo(user)}>{user.name}</div>))
    listContainer = <div className="filteredList">{listContents}</div>
  }

  function changingInputText(event) {
    updateMatchingList(event.target.value)
    updateInputValue(event.target.value)
  }

  return <div>
    <div className="searchBox">
      <input onChange={changingInputText} value={inputText} placeholder="Enter a username" />
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

SearchUser.propTypes = {
  users: PropTypes.array,
  inputText: PropTypes.string,
  showUserInfo: PropTypes.func,
  updateInputValue: PropTypes.func,
  updateMatchingList: PropTypes.func
}

const App = (props) => {
  let app = <SearchUserWrapped />
  if (props.displayedUser)
    app = <DisplayUserWrapped />
  return (
    <div className="App">
      {app}
    </div>)
}


const mapStateToPropsForApp = (state) => {
  return {
    displayedUser: state.displayedUser
  }
}

export default connect(mapStateToPropsForApp)(App)
