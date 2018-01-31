import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';

export const SEARCH_USER = "SEARCH_USER"
export const GO_BACK_TO_SEARCH = "GO_BACK_TO_SEARCH"
export const UPDATE_MATCHING_USERS = "UPDATE_MATCHING_USERS"

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

const initialState = {
    users: initialUserArray,
    diplayedUser: null
}

function reducer(state=initialState, action) {
    switch(action.type) {
        case SEARCH_USER:
            return {...state, displayedUser: action.payload};
        case GO_BACK_TO_SEARCH:
            return {...state, displayedUser: null};
        case UPDATE_MATCHING_USERS:
            return {...state, users: initialUserArray.filter(user => user.name.includes(action.payload))}
        default:
            return state;
    }
}

const store = createStore(reducer,compose(window.devToolsExtension ? window.devToolsExtension() : f => f));

const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
