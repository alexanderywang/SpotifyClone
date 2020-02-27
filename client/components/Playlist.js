import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

export default class Playlist extends Component {
  constructor() {
    super()
    this.state = {
      song: '',
      artist: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  async handleSubmit(event) {
    event.preventDefault()

    const newSong = {
      song: event.target.song.value,
      artist: event.target.artist.value
    }
    console.log(newSong)

    // const {data} = await axios.get('https://api.spotify.com/v1/tracks')
    // console.log(data)
    // this.props.addNewSong(newSong)

    this.setState({
      song: '',
      artist: ''
    })
  }

  render() {
    return (
      <div>
        <h1>Search for Songs</h1>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="song">
            Song Name:
            <input
              name="song"
              type="text"
              onChange={this.handleChange}
              value={this.state.song}
            />
          </label>

          <label htmlFor="artist">Artist:</label>
          <input
            name="artist"
            type="text"
            onChange={this.handleChange}
            value={this.state.artist}
          />
          <hr />
          <button type="submit">Find the Song</button>
        </form>
      </div>
    )
  }
}
