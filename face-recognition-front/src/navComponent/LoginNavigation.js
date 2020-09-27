import React from 'react';
import './Navigation.css';

const LoginNavigation = ({ routeChange }) => {
    return <div>
            <nav className="signout">
                <span onClick={() => routeChange("login")}>Login</span>
                <span onClick={() => routeChange("register")}>Register</span>
            </nav>
        </div>;
}

export default LoginNavigation;
