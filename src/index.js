import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

//Redux specific imports
import { Provider, connect } from 'react-redux';
import {createStore, combineReducers} from 'redux';
//-----------------------

// This is the initial state which will be pushed in the store
const initialState = {
  counter: 0,
  couterLabel: 'Counter:'
}
//-----------------------

// Below is a basic function called reducer to reduce the state/action to a new state
export const CoreReducer = (state = initialState, action)  => {
  const newState = {...state}
  switch(action.type) {
    case 'INCREMENT': newState.counter = newState.counter + 1;
                      break;
    case 'DECREMENT': newState.counter = newState.counter - 1;
                      break;
    default: break;
  }

  return newState
}

// You can combiine multiple of these reducer function together as a map using combineReducers function.
export const AppReducer = combineReducers({ core: CoreReducer});

// Use either the reducer function directly or the combined reducers as reducer while creating a store.
export const store = createStore(AppReducer)

function App(props) {
  return (
    <div className="App">
      <h1>{props.headerText}</h1>
      <h1>Counter: {props.core.counter}</h1>
      <button onClick={() => props.decrement()}> Decrement </button>
      <button onClick={() => props.increment()}> Increment </button>
    </div>
  );
}

//map state to Props
const mapStateToProps = (state) => {
  return {
    ...state,
    headerText: 'Simple counter application built with react and Redux',
  }
}

//map dispatch to Props
const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => { dispatch({type: 'INCREMENT'}) },
    decrement: () => { dispatch({type: 'DECREMENT'}) },
  }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}><ConnectedApp /></Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
