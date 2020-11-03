import React from 'react';
import axios from 'axios';
import { config } from '../config';
import Popup from './Popup';

export default class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isPopupVisible: false,
            photos: null,
        };
    }

    async componentDidMount() {
        const urlParam = new URLSearchParams(window.location.search);
        const id = urlParam.get('album_id');
        const response = await axios.get(`${config.url}/photos?albumId=${id}`);
        this.setState({ photos: response.data, isLoading: false });
    }

    togglePopup = () => {
        const { isPopupVisible } = this.state;
        this.setState({ isPopupVisible: !isPopupVisible });
    }

    renderPopUp = () => {
        const { isPopupVisible } = this.state;
        return (
            isPopupVisible &&
            <Popup
                url={"123"}
                close={this.togglePopup}
            />
        )
    }

    renderPhoto = (photos) => {
        return photos.map((photo) => 
            <li key={photo.id}>
                <div>
                    {this.renderPopUp()}
                    <div>{photo.title}</div>
                    <div><img src={photo.thumbnailUrl} /></div>
                    <button onClick={this.togglePopup}>show popup</button>  
                </div>
            </li>
        );
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