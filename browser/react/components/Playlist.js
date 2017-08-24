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
    this.addSong = this.addSong.bind(this)
  }
  fetchPlaylist(playlistId) {
    axios.get(`/api/playlists/${playlistId}`)
    .then(res=>res.data)
    .then(playlist => {
      this.setState({playlist})
    })
  }
  addSong(playlistId, songId) {
    return axios.post(`/api/playlists/${playlistId}/songs`, {
      id: songId
    })
      .then(res => res.data)
      .then(song => {
        const playlist = this.state.playlist
        const songs = playlist.songs
        const newSongs = [...songs, song]
        const newPlaylist = Object.assign({}, playlist, {songs: newSongs})
        this.setState({
          playlist: newPlaylist
        })
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
    const { playlist } = this.state
    return(
      <div>
        <h3>{ playlist.name }</h3>
        <Songs songs={playlist.songs} /> {/** Hooray for reusability! */}
        { playlist.songs && !playlist.songs.length && <small>No songs</small> }
        <hr />
        <AddSongForm playlist={playlist} addSong={this.addSong}/>
      </div>
    )
  }


}
