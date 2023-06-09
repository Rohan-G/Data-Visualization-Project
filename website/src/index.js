import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Dominance from './ChampionshipWinners';
import Main from './Main.js'
import reportWebVitals from './reportWebVitals';
import Casualties from './Casualties';
import Linking from './Linking';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Dominance /> */}
    {/* <Casualties /> */}
    <Linking />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
