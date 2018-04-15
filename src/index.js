import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect, Switch } from 'react-router';

ReactDOM.render((

<Router>
<Switch>
    <Route path="/" component={App} />
    <Route path="/active" component={App} />
    <Route path="/completed" component={App} />
    
    <Route exact path="/" render={()=>  (<Redirect to="/" />)}/>
</Switch></Router>), document.getElementById('root'));
registerServiceWorker();
