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
        const albums = await axios.get(`${config.url}/albums?userId=${id}`);
        const photosData = await axios.get(`${config.url}/photos`);
        this.setState({ albums: albums.data, isLoading: false });
    }

    renderAlbum = (albums) => {
        return albums.map((album) => <li key={album.id}>
                    <Link to={`/gallery?album_id=${album.id}`}>{album.title}</Link>
                </li>
        );
    }

    render() {
        const { albums, isLoading } = this.state;
        return (
            <>
                <h1>Альбомы</h1>
                { !isLoading && <ul>{this.renderAlbum(albums)}</ul>}
            </>
        )
    }
}