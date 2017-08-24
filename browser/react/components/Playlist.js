import React, {Component} from 'react';
import Songs from './Songs';
import AddSongForm from './AddSongForm'
import axios from 'axios'

export default class Playlist extends Component {

  constructor() {
    super()
    this.state = {
      playlist: {}
    }

    this.fetchPlaylist = this.fetchPlaylist.bind(this)

  }

  fetchPlaylist(playlistId) {
    axios.get(`/api/playlists/${playlistId}`)
      .then(res=>res.data)
      .then(playlist => {
        // playlist.songs = playlist.songs.map(convertSong);
        this.setState({playlist})
      })
  }

  componentDidMount() {
    const playlistId = this.props.match.params.playlistId
    this.fetchPlaylist(playlistId);

  }

  componentWillReceiveProps(nextProps) {
    const nextPlaylistId = nextProps.match.params.playlistId
    const currentPlaylistId = this.props.match.params.playlistId
    if (nextPlaylistId !== currentPlaylistId) {
      this.fetchPlaylist(nextPlaylistId);
    }

  }

  render() {
    const playlist = this.state.playlist
    return(
      <div>
        <h3>{ playlist.name }</h3>
        <Songs songs={playlist.songs} /> {/** Hooray for reusability! */}
        { playlist.songs && !playlist.songs.length && <small>{playlist.songs}</small> }
        <hr />
        <AddSongForm playlistId={playlist.id}/>
      </div>
    )
  }


}
