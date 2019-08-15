import React, { Component } from 'react';
import './App.css';

let fakeServerData = {
  user: {
    name: 'Chai',
    playlists: [
      {
        name: 'Shameful Music',
        songs: [
          {name: 'Favorite Sound', duration: 180},
          {name: 'All My Friends', duration: 180},
          {name: 'Slow', duration: 180}
        ]
      },
      {
        name: 'Sad Music',
        songs: [
          {name: 'Hurt By You', duration: 180},
          {name: 'All For You', duration: 180},
          {name: '1000 Times', duration: 180}
        ]
      },
      {
        name: 'Beats',
        songs: [
          {name: 'No Limit', duration: 180},
          {name: 'Reptile', duration: 180},
          {name: 'Taking Over', duration: 180}
        ]
      },
      {
        name: 'Classical',
        songs: [
          {name: 'Cascade Street', duration: 180},
          {name: 'It Was There', duration: 180},
          {name: 'Les Deux Pianos', duration: 180}
        ]
      }
    ]
  }
};

class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{width:'50%', display: 'inline-block'}}>
        <h2>{this.props.playlists.length} playlists</h2>
      </div>
    )
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, [])
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0)
    return (
      <div style={{width:'50%', display: 'inline-block'}}>
        <h2>{Math.round(totalDuration/60)} Minutes</h2>
      </div>
    )
  }
}

class Filter extends Component {
  render() {
    return (
      <div>
        <input type="text" onKeyUp={event =>
          this.props.onTextChange(event.target.value)} />
      </div>
    )
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist
    return (
      <div style={{width: '20%', display: 'inline-block'}}>
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song =>
            <li>{song.name}</li>
          )}
        </ul>
      </div>
      )
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString:''
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    }, 1000);
  }
  render() {
    let playlistsToRender = this.state.serverData.user ? this.state.serverData.user.playlists
      .filter(playlist =>
        playlist.name.toLowerCase().includes(
          this.state.filterString.toLowerCase())
    ) : []
    return (
      <div className="App">
        {this.state.serverData.user ?
        <div>
          <h1>
            {this.state.serverData.user.name}'s Playlist
          </h1>
          <PlaylistCounter playlists={playlistsToRender}/>
          <HoursCounter playlists={playlistsToRender}/>
          <Filter onTextChange={text => {
              this.setState({filterString: text})
            }}/>
          {playlistsToRender.map(playlist =>
            <Playlist playlist={playlist} />
          )}
        </div> : <h1>Loading...</h1>
        }
      </div>
    );
  }
}

export default App;
