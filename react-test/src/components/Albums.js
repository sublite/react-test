import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { config } from '../config';

export default class Albums extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            albums: null,
        };
    }

    async componentDidMount() {
        const urlParam = new URLSearchParams(window.location.search);
        const id = urlParam.get('user_id');
        const response = await axios.get(`${config.url}/albums?userId=${id}`);
        this.setState({ albums: response.data, isLoading: false });
    }

    renderAlbum = (albums) => {
        return albums.map((album) => <li key={album.id}><Link to={`/photos?album_id=${album.id}`}>{album.title}</Link></li>);
    }

    render() {
        const { albums, isLoading } = this.state;
        return <>{ !isLoading && <ul>{this.renderAlbum(albums)}</ul>}</>
    }
}