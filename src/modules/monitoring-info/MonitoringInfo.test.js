import React from 'react';
import ReactDOM from 'react-dom';
import MonitoringInfo from './MonitoringInfo';

it('renders without crashing', () => {
  const body = document.createElement('body');
  const div = document.createElement('div');
  div.setAttribute("id", "root");
  body.appendChild(div);
  ReactDOM.render(<MonitoringInfo />, div);
});
