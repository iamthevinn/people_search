import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      users: [
        new User('Bobby', 'Los Angeles', 'Software Development', 'Many many awesome fun hobbies', 'email@email.com'),
        new User('Henry', 'Seattle', 'Software Production', 'TV shows', 'root@email.com'),
        new User('Sofie', 'Boulder', 'Software Engineer', 'Gardening', 'souped up@email.com'),
        new User('Miranda', 'Detroit', 'Mechanic', 'Video Games', 'trippers@email.com'),
        new User('Jerome', 'NYC', 'Physicist', 'Reading', 'email@mailamail.com'),
        new User('Millie', 'Hawkins, Indiana', 'ESP', 'Blowing up things from the upside down', 'hoppin@email.com'),
        new User('Train', 'Oaklahoma City', 'Real Engineer', 'choo choo', 'chooc.choo@email.com'),
      ],
      diplayedUser: null
    }

    this.changingInputText = this.changingInputText.bind(this);
    this.getUsersToDisplay = this.getUsersToDisplay.bind(this);
    this.allItemsNull = this.allItemsNull.bind(this);
    this.showUserInfo = this.showUserInfo.bind(this);
    this.backToSearch = this.backToSearch.bind(this);
  }

  changingInputText(event) {
    this.setState({inputText: event.target.value})
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

  backToSearch() {
    console.log("back")
    this.setState({diplayedUser: null,inputText: ""})
  }
  
  render() {

    let usersToDisplay = this.getUsersToDisplay();
    console.log(usersToDisplay)

    let listContents = null;
    if (usersToDisplay)
      listContents = usersToDisplay.map((user) => { 
        if (user)
          return <div key={user.id} onClick={() => this.showUserInfo(user)} >{user.name}</div>
        else
          return null
        }
      )
    
    let listContainer = null;
    if (listContents != null && this.allItemsNull(listContents))
      listContainer = <div className="filteredList">{listContents}</div>

    let app = <div><div className="searchBox">
                <input onChange={this.changingInputText} placeholder="Enter a username"/>
              </div>
              <div className="listOfUsers">
                {listContainer}
              </div></div>

    if (this.state.diplayedUser)
      app = <div>
                <div className="backButton">
                  <a href="javascript:void(0);" onClick={this.backToSearch}>Back</a>
                </div>
                <div className="displayUserInfo">
                  <h1>{this.state.diplayedUser.name}</h1>
                  <div>City: {this.state.diplayedUser.name}</div>
                  <div>Industry: {this.state.diplayedUser.industry}</div>
                  <div>Hobbies: {this.state.diplayedUser.hobbies}</div>
                  <div>Email: {this.state.diplayedUser.email}</div>
              </div>
            </div>
      
    
    return (
      <div className="App">
        {app}
      </div>
    );
  }
}

export default App;
