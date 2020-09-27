import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Login from './authComponent/Login';
import Register from './authComponent/Register';
import LoginNavigation from './navComponent/LoginNavigation';
import AppNavigation from './navComponent/AppNavigation';
import Footer from './footerComponent/Footer';
import App from './App';

import "semantic-ui-css/semantic.min.css";

class Root extends Component {

    state = {
        route: 'login',
        user : {
            id: '',
            username: '',
            email: '',
            entries: '',
            joined: ''
        }
    }

    onRouteChange = (route) => this.setState({ route: route });

    loadUser = (data) => {
        this.setState({ 
            user : {
                id: data.id,
                username: data.username,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        });
    }

    render () {
        const { route, user } = this.state;
        const { loadUser, onRouteChange } = this;
        switch(route) {
            case 'register':
                return (
                    <div>
                        <LoginNavigation 
                            routeChange={onRouteChange} 
                        />   
                        <Register 
                            loadUser={loadUser} 
                            routeChange={onRouteChange}
                        />
                        <Footer/>
                    </div>
                )
            case 'home':
                return (
                    <div>
                        <AppNavigation 
                            routeChange={onRouteChange} 
                        />
                        <App 
                            user={user}
                        />
                        <Footer/>
                    </div>
                )
            default:
                return (
                    <div>
                        <LoginNavigation 
                            routeChange={onRouteChange} 
                        />   
                        <Login 
                            loadUser={loadUser} 
                            routeChange={onRouteChange}
                        />
                        <Footer/>
                    </div>
                )
        }
    }
}
 
ReactDOM.render(<Root />, document.getElementById('root'));