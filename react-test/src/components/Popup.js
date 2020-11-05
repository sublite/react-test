import React from 'react';
import _ from 'lodash';

export default class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idPhoto: 0,
            url: "",
            lastIndex: 0,
        };
    }

    componentDidMount() {
        const { id, photoData } = this.props;
        const url = _.find(photoData, { id }).url;
        const lastIndex = photoData.length - 1;
        this.setState({ url, lastIndex, idPhoto: id });
    }

    handleNext = () => {
        const { idPhoto, lastIndex } = this.state;
        const { photoData } = this.props;
        const index = _.findIndex(photoData, { id: idPhoto });
        const newIndex = (index + 1) > lastIndex ? 0 : index + 1;
        const { url } = photoData[newIndex];
        const { id } = photoData[newIndex];
        this.setState({ idPhoto: id, url });
    }

    handlePrev = () => {
        const { idPhoto, lastIndex } = this.state;
        const { photoData } = this.props;
        const index = _.findIndex(photoData, { id: idPhoto });
        const newIndex = (index - 1) < 1 ? lastIndex : index - 1;
        const { url } = photoData[newIndex];
        const { id } = photoData[newIndex];
        this.setState({ idPhoto: id, url });
    }

    render() {
        const { close } = this.props;
        const { url } = this.state;
        return (
            <div className="popup">
                <button className="popUpButton closeButton" onClick={close}>Закрыть</button>
                <div className="popupMain">
                    <img src={url} alt="url" className="popupImage" />
                    <div className="popUpFooter">
                        <button className="popUpButton" onClick={this.handlePrev}>Назад</button>
                        <button className="popUpButton" onClick={this.handleNext}>Вперед</button>
                    </div>
                </div>
            </div>
        );
    }
}
 