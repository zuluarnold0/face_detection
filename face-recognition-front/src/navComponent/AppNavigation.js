import React from 'react';
import './Navigation.css';

const AppNavigation = ({ routeChange }) => {
    return <div>
        <nav className="signout">
            <span onClick={() => routeChange("login")}>LogOut</span>
        </nav>
    </div>;
}

export default AppNavigation;