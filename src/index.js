import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store.js'
import App from './components/App'

ReactDOM.render(
  <Provider store={ store }>
    <App/>
  </Provider>,
  document.getElementById('root')
)

// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import './index.css';

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );
