

import * as serviceWorker from './serviceWorker';
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import App from './App';
import store from './store/store'

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister();
