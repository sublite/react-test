import React from 'react';
import axios from 'axios';
import CircularProgress from './CircularProgress';
import { config } from '../config';
import { Link } from "react-router-dom";

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
        return albums.map((album) => <div className="album" key={album.id}>
                    <Link to={`/gallery?album_id=${album.id}`}>
                        <div className="albumCover">
                            <img src={photoData[album.id][0].thumbnailUrl} alt="cover"/>
                        </div>
                    </Link>
                    <span className="albumInfo">{album.title}, {photoData[album.id].length} шт. </span>
                    </div>
        );
    }

    render() {
        const { albums, isLoading } = this.state;
        return (
            <>
                <Link to="/">Назад</Link>
                <p className="title">Альбомы</p>
                {isLoading && <CircularProgress />}
                { !isLoading && <div className="gallery">{this.renderAlbum(albums)}</div>}
            </>
        );
    }
}