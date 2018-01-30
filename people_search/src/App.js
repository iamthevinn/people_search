import React, { Component } from 'react';
import './App.css';
//import {connect} from 'react-redux'
//import {SEARCH_USER,GO_BACK_TO_SEARCH} from './index.js';

const DisplayUser = (props) => {
  const {name, city, industry, hobbies, email} = props.displayedUser;
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

const SearchUser = (props) => {
  const {usersMatchingFilter, showUserInfo} = props;

  let listContainer = null;
  if (usersMatchingFilter.length) {
    const listContents = usersMatchingFilter.map((user) => (<div key={user.id} onClick={() => showUserInfo(user)}>{user.name}</div>))
    listContainer = <div className="filteredList">{listContents}</div>
  }

  return <div>
            <div className="searchBox">
              <input onChange={props.changingInputText} value={props.inputText} placeholder="Enter a username"/>
            </div>
            <div className="listOfUsers">
              {listContainer}
            </div>
          </div>
}

// const mapStateToProps = (state) => {
//   return {
//     users: state.users
//   }
// }


// const mapDispatchToProps = (dispatch) => {
//   return {
//     handleUserListUpdate(text) {
//       dispatch({type: SEARCH_USER, payload: text})
//     }
//   }
// }
// const SearchUserWrapped = connect(mapStateToProps, mapDispatchToProps)(SearchUser);

const genId = (str1, str2, str3) => {
  const megaStr = '' + str1 + str2 + str3;
  const chars = [];
  for(let i = 0; i < megaStr.length; i++) {
    const randomVal = Math.floor(Math.random() * 3 * megaStr.charCodeAt(i));
    if (randomVal % 3 === 0) {
      chars.push(i);
    } else {
      chars.push(String.fromCharCode(randomVal));
    } if(i === str1.length || i === str2.length) chars.push('-')
  }
  return chars.join('');
}

class User {
  constructor(
    name,
    city,
    industry,
    hobbies,
    email
  ) {
    this.name = name;
    this.city = city;
    this.industry = industry;
    this.hobbies = hobbies;
    this.email = email;
    this.id = genId(email, industry, city);
  }
}

const initialUserArray = [
  new User('Bobby', 'Los Angeles', 'Software Development', 'Many many awesome fun hobbies', 'email@email.com'),
  new User('Henry', 'Seattle', 'Software Production', 'TV shows', 'root@email.com'),
  new User('Sofie', 'Boulder', 'Software Engineer', 'Gardening', 'souped up@email.com'),
  new User('Miranda', 'Detroit', 'Mechanic', 'Video Games', 'trippers@email.com'),
  new User('Jerome', 'NYC', 'Physicist', 'Reading', 'email@mailamail.com'),
  new User('Millie', 'Hawkins, Indiana', 'ESP', 'Blowing up things from the upside down', 'hoppin@email.com'),
  new User('Train', 'Oaklahoma City', 'Real Engineer', 'choo choo', 'chooc.choo@email.com'),
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      users: initialUserArray,
      diplayedUser: null
    }

    this.changingInputText = this.changingInputText.bind(this);
    this.getUsersToDisplay = this.getUsersToDisplay.bind(this);
    this.allItemsNull = this.allItemsNull.bind(this);
    this.showUserInfo = this.showUserInfo.bind(this);
    this.backToSearch = this.backToSearch.bind(this);
  }

  changingInputText(event) {
    let updatedUserList = initialUserArray.filter(user => user.name.startsWith(event.target.value))
    this.setState({inputText: event.target.value, users: updatedUserList })
  }

  getUsersToDisplay() {
    if (this.state.inputText)
      return this.state.users.map((user) => user.name.startsWith(this.state.inputText) ? user : null)
    return this.state.users;
  }

  allItemsNull(list) {
    for (let i = 0; i < list.length; i++) {
      if (list[i] != null)
        return true;
    }
    return false;
  }

  showUserInfo(user) {
    this.setState({diplayedUser: user})
  }

  backToSearch(e) {
    e.preventDefault();
    this.setState({diplayedUser: null})
  }
  
  render() {

    let app = <SearchUser changingInputText={this.changingInputText} inputText={this.state.inputText} usersMatchingFilter={this.state.users} allItemsNull={this.allItemsNull} showUserInfo={this.showUserInfo} getUsersToDisplay={this.getUsersToDisplay} />

    if (this.state.diplayedUser)
      app = <DisplayUser displayedUser={this.state.diplayedUser} backToSearch={this.backToSearch}/>    
    
    return (
      <div className="App">
        {app}
      </div>
    );
  }
}

export default App;
