import React from 'react';

export default class CircularProgress extends React.Component {
    render () {
        return (
            <div className="progressContainer">
                <div className="circularProgress"/>
                    <p>Загрузка...</p>
            </div>
        );
    }
}