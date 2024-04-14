import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from "./Components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

// Create the Redux Store
const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <React.StrictMode>
    <Provider store={store}>
      <Header/>
      <App />
    </Provider>
 </React.StrictMode>
);