import React from 'react';
import axios from 'axios';
import { config } from '../config';
import Popup from './Popup';
import { Link } from "react-router-dom";

export default class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isPopupVisible: false,
            photos: null,
            urlPhoto: "",
        };
    }

    async componentDidMount() {
        const urlParam = new URLSearchParams(window.location.search);
        const id = urlParam.get('album_id');
        const response = await axios.get(`${config.url}/photos?albumId=${id}`);
        this.setState({ photos: response.data, isLoading: false });
    }

    togglePopup = (url) => {
        const { isPopupVisible } = this.state;
        this.setState({ isPopupVisible: !isPopupVisible, urlPhoto: url });
    }

    renderPopUp = () => {
        const { isPopupVisible, urlPhoto } = this.state;
        return (
            isPopupVisible &&
            <Popup
                url={urlPhoto}
                close={this.togglePopup}
            />
        );
    }

    renderPhoto = (photos) => {
        return photos.map((photo) => 
            <li key={photo.id}>
                <div>
                    <div>{photo.title}</div>
                    <div><img src={photo.thumbnailUrl} alt="preview image" /></div>
                    <button onClick={() => this.togglePopup(photo.url)}>show popup</button>  
                </div>
            </li>
        );
    }

    render() {
        const { photos, isLoading } = this.state;
        return (
            <>
                 {this.renderPopUp()}
                <h1>Фотографии</h1>
                {!isLoading && <ul>{this.renderPhoto(photos)}</ul>}
            </>
        )
    }
}