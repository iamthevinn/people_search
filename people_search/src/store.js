	// Example representation of store
	import { createStore } from 'redux';
	import reducer from './reducer.js';
	const store = createStore(reducer);
	console.log(store) 
	// {
	//	state: state,
	//	subscribe() {// Does subscrib stuff...},
	//	getState() {return this.state // Returns state},
	//	dispatch(action) {// Does dispatch stuff...}
	// }
