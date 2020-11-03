import React from 'react';
import axios from 'axios';
import { config } from '../config';

export default class Photos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            photos: null,
        };
    }

    async componentDidMount() {
        const urlParam = new URLSearchParams(window.location.search);
        const id = urlParam.get('album_id');
        const response = await axios.get(`${config.url}/photos?albumId=${id}`);
        this.setState({ photos: response.data, isLoading: false });
    }

    renderPhoto = (photos) => {
        return photos.map((photo) => <li key={photo.id}>{photo.title}</li>);
    }

    render() {
        const { photos, isLoading } = this.state;
        return (
            <>
                <h1>Фото</h1>
                { !isLoading && <ul>{this.renderPhoto(photos)}</ul>}
            </>
        )
    }
}