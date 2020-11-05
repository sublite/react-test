import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { config } from '../config';

export default class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            users: null,
        };
    }

    async componentDidMount() {
        const response = await axios.get(`${config.url}/users`);
        this.setState({ users: response.data, isLoading: false });
    }

    renderList = (users) => {
        return users.map((user) => <li key={user.id}><Link to={`/albums?user_id=${user.id}`}>{user.name}</Link></li>);
    }

    render() {
        const { users, isLoading } = this.state;
        return (
                <>
                    <h1>Авторы</h1>
                    {isLoading && <div className="circularProgress"/>}
                    {!isLoading && <ul>{this.renderList(users)}</ul>}
                </>
        )
    }
}