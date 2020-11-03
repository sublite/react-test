import React from 'react';

export default class Popup extends React.Component {
    render() {
        const { url, close } = this.props;
        return (
            <div className='popup'>
                <div className='popup_inner'>
                     {/* <img src={url} width="500" height="500" /> */}
                     <div>{url}</div>
                    <button onClick={close}>Закрыть</button>
                </div>
            </div>
        );
    }
}
 