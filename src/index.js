import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import FirstWf from './ReactFlowExample';
import NewDrawWF from './jsonLoad/WfDraw';
import Ex02 from './Ex02';
import reportWebVitals from './reportWebVitals';
import OverviewFlow from './OverviewFlow'


ReactDOM.render(
  <React.StrictMode>
    
    <NewDrawWF />
    

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
