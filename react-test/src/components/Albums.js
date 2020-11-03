import React from 'react';
import axios from 'axios';

export default class Albums extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            albums: null,
        };
    }

    async componentDidMount() {
        const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
        this.setState({ albums: response.data, isLoading: false });
    }

    renderAlbum = (albums) => {
        return albums.map((album) => <li key={album.id}>{album.title}</li>);
    }

  render() {
    const { albums, isLoading } = this.state;
    return <>{ !isLoading && <ul>{this.renderAlbum(albums)}</ul>}</>
  }
}