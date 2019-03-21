import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter> 
    <App />
  </BrowserRouter>
    , document.getElementById('app') as HTMLElement
);
registerServiceWorker();
