import React from 'react';
import axios from 'axios';
import { config } from '../config';
import CircularProgress from './CircularProgress';
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
            <div key={photo.id}>
                <div className="image">
                    <img 
                        className="previewImage"
                        src={photo.thumbnailUrl} 
                        alt="preview image" 
                        onClick={() => this.openPopUp(photo.id)} 
                    />
                </div>
                <p className="info">{photo.title}</p>
            </div>
        );
    }

    goBack = () => {
        return  window.history.back();
    }

    render() {
        const { photos, isLoading } = this.state;
        return (
            <>
                <button className="buttonBack" onClick={this.goBack}>К списку альбомов</button>
                <p className="title">Фотографии</p>
                {isLoading && <CircularProgress />}
                {!isLoading && 
                <>
                    {this.renderPopUp()}
                    <div className="grid">{this.renderPhoto(photos)}</div>
                </>
                }
            </>
        )
    }
}