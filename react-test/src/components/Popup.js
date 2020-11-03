import React from 'react';

export default class Popup extends React.Component {
    render() {
        const { url, close } = this.props;
        console.log("props", this.props)
        return (
            <div className='popup'>
                <div className='popup_inner'>
                     <h1>{url}</h1>
                    <button onClick={close}>Закрыть</button>
                </div>
            </div>
        );
    }
}
 