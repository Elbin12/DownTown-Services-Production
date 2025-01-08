import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from 'react-redux';
import {store} from './redux/store';
import { GoogleMapsProvider } from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId='484952135134-ut5tcak70fkt5l4460rlosla8vr1rg4k.apps.googleusercontent.com'>
      <GoogleMapsProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </GoogleMapsProvider>
    </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
