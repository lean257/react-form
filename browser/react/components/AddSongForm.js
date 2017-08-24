import React, {Component} from 'react'
import Playlist from './Playlist'
import Songs from './Songs'
import axios from 'axios'

export default class AddSongForm extends Component {
  constructor() {
    super()
    this.state = {
      song: '',
      songArr: []
    }
    this.addSong = this.addSong.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    this.setState({
      song: evt.target.value
    })
  }

  componentDidMount() {
    axios.get('/api/songs')
    .then(res => {
      this.setState({
        songArr: res.data
      })
    })
  }

  addSong(songName) {
    const playlistId = this.props.playlistId
    const songArr = this.state.songArr.filter(song => song.name === songName)
    axios.post(`/api/playlists/${playlistId}/songs`, {song: songArr[0]})
      .then(res => res.data)
      .then(song => {
        this.setState({
          song: song
        })
      })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.addSong(this.state.song)
  }

  render() {
    return (
      <div className="well">
      <form className="form-horizontal" noValidate name="songSelect" onSubmit={this.handleSubmit}>
      <fieldset>
      <legend>Add to Playlist</legend>
      <div className="form-group">
      <label htmlFor="song" className="col-xs-2 control-label">Song</label>
      <div className="col-xs-10">
      <select className="form-control" name="song" onChange={this.handleChange}>
      {this.state.songArr.map(song => <option key={song.id}>{song.name}</option>)}
      </select>
      </div>
      </div>
      <div className="form-group">
      <div className="col-xs-10 col-xs-offset-2">
      <button type="submit" className="btn btn-success">Add Song</button>
      </div>
      </div>
      </fieldset>
      </form>
      </div>

    )
  }
}
