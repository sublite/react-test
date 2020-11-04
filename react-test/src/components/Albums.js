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
            photoData: null,
        };
    }

    async componentDidMount() {
        const urlParam = new URLSearchParams(window.location.search);
        const id = urlParam.get('user_id');
        const albums = await axios.get(`${config.url}/albums?userId=${id}`);
        const responsePhoto = await axios.get(`${config.url}/photos`);
        const photo = responsePhoto.data;
        const photoData = photo.reduce((accumulator, currentValue) => {      
                            if (!accumulator[currentValue.albumId]) {
                              accumulator[currentValue.albumId] = [currentValue];
                            } else {
                              accumulator[currentValue.albumId].push(currentValue)               
                            }
                            return accumulator;
                          }, {});
        this.setState({ albums: albums.data, isLoading: false, photoData });
    }

    renderAlbum = (albums) => {
        const { photoData } = this.state;
        return albums.map((album) => <li key={album.id}>
                    <div>
                        <span>Количество фотографий в альбоме - {photoData[album.id].length}</span>
                        <img src={photoData[album.id][0].thumbnailUrl} alt="cover"/>
                        <Link to={`/gallery?album_id=${album.id}`}>{album.title}</Link>
                    </div>
                </li>
        );
    }

    render() {
        const { albums, isLoading } = this.state;
        return (
            <>
                <Link to="/">Назад</Link>
                <h1>Альбомы</h1>
                { !isLoading && <ul>{this.renderAlbum(albums)}</ul>}
            </>
        );
    }
}