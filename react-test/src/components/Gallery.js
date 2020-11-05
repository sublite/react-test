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
            idPhoto: "",
        };
    }

    async componentDidMount() {
        const urlParam = new URLSearchParams(window.location.search);
        const id = urlParam.get('album_id');
        const response = await axios.get(`${config.url}/photos?albumId=${id}`);
        this.setState({ photos: response.data, isLoading: false });
    }

    openPopUp = (id) => {
        this.setState({ isPopupVisible: true, idPhoto: id });
    }

    closePopUp = () => {
        this.setState({ isPopupVisible: false })
    }

    renderPopUp = () => {
        const { isPopupVisible, idPhoto, photos } = this.state;
        const photoData = photos.map((elem) =>( {id: elem.id, url: elem.url}));
        return (
            isPopupVisible &&
            <Popup
                id={idPhoto}
                photoData={photoData}
                close={this.closePopUp}
            />
        );
    }

    renderPhoto = (photos) => {
        return photos.map((photo) => 
            <li key={photo.id}>
                <div>
                    <div>{photo.title}</div>
                    <div><img src={photo.thumbnailUrl} alt="preview image" /></div>
                    <button onClick={() => this.openPopUp(photo.id)}>show popup</button>  
                </div>
            </li>
        );
    }

    goBack = () => {
        return  window.history.back();
    }

    render() {
        const { photos, isLoading } = this.state;
        return (
            <>
                <button onClick={this.goBack}>Назад</button>
                <h1>Фотографии</h1>
                {isLoading && <div className="circularProgress"/>}
                {!isLoading && 
                <>
                    {this.renderPopUp()}
                    <ul>{this.renderPhoto(photos)}</ul>
                </>
                }
            </>
        )
    }
}