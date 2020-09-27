import React from 'react';
import './Rank.css'

const Rank = ({ user }) => {
    return (
        <div className="rank">
            <div>
                <h3>
                    <strong>{`${ user.username[0].toUpperCase() + user.username.slice(1)}`}</strong> {`your current entry count is...`}
                </h3>
            </div>
            <div>
                <h1>{`#${user.entries}`}</h1>
            </div>
        </div>
    )
}

export default Rank;
