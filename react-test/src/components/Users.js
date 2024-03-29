import React from 'react';
import axios from 'axios';
import { config } from '../config';
import CircularProgress from './CircularProgress';
import { Link } from "react-router-dom";

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
        return users.map((user) => <p className="userList" key={user.id}><Link to={`/albums?user_id=${user.id}`}>{user.name}</Link></p>);
    }

    render() {
        const { users, isLoading } = this.state;
        return (
                <>
                    <p className="title">Список авторов</p>
                    {isLoading && <CircularProgress />}
                    {!isLoading && 
                        <div className="users">
                            {this.renderList(users)}
                        </div>
                    }
                </>
        );
    }
}