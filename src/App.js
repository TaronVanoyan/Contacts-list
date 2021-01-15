import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {useSelector} from 'react-redux';
import React from 'react';

import GuardedRoute from './service/GuardedRoute';
import {SignIn, SignOut, Dashboard, Profile} from './components';
import './App.css';

function App() {
    const isAuthenticated = useSelector(state => state.isAuthenticated);

    return (
        <div className="App">
            {isAuthenticated && <SignOut/>}
            <Router>
                <Switch>
                    <GuardedRoute path='/profile' component={Profile} auth={isAuthenticated}/>
                    <GuardedRoute path='/dashboard' component={Dashboard} auth={isAuthenticated}/>
                    <Route path='/' component={SignIn}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
