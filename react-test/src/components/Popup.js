import React from 'react';

export default class Popup extends React.Component {
    render() {
        const { url, close } = this.props;
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <img src={url} alt="url" className='popup_image' />
                    <button onClick={close}>Закрыть</button>
                </div>
            </div>
        );
    }
}
 