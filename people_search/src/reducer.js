import {SEARCH_USER, GO_BACK_TO_SEARCH} from './types';

// Example representation of state
const initialState = {
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

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SEARCH_USER:
            return Object.assign(...state, {diplayedUser: action.payload});
        case GO_BACK_TO_SEARCH:
            return Object.assign(...state, {diplayedUser: null, inputText: ""});
        default:
            return state;
    }
}