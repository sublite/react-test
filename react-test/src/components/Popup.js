import React from 'react';
import _ from 'lodash';

export default class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idPhoto: 0,
            url: "",
            photoCount: 0,
        };
    }

    componentDidMount() {
        const { id, photoData } = this.props;
        const url = this.getUrl(id);
        const count = photoData.length;
        this.setState({ url, photoCount: count, idPhoto: id });
    }

    getUrl = (id) => {
        const { photoData } = this.props;
        const url = _.find(photoData, {'id': id}).url;
        return url;
    }

    handleNext = () => {
        const { idPhoto, photoCount } = this.state;
        const id = (idPhoto + 1) > photoCount ? 1 : idPhoto + 1;
        const url = this.getUrl(id);
        this.setState({ idPhoto: id, url })
    }

    handlePrev = () => {
        const { idPhoto, photoCount } = this.state;
        const id = (idPhoto - 1) < 1 ? photoCount : idPhoto - 1;
        const url = this.getUrl(id);
        this.setState({ idPhoto: id, url })
    }

    render() {
        const { close } = this.props;
        const { url } = this.state;
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <img src={url} alt="url" className='popup_image' />
                    <button onClick={close}>Закрыть</button>
                    <button onClick={this.handleNext}>Вперед</button>
                    <button onClick={this.handlePrev}>Назад</button>
                </div>
            </div>
        );
    }
}
 