import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers'; // Adjust the path as necessary
import Header from "./Components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

// Create the Redux store
const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app with Redux and React-Redux
root.render(
 <React.StrictMode>
    <Provider store={store}>
      <Header/>
      <App />
    </Provider>
 </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
