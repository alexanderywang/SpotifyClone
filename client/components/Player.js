// An API token that we’ll provide to the Spotify API so that we can log in with a Spotify account,
// a device ID that represents this web browser as a “Spotify player”,
// a boolean value showing whether we’re trying to logged in or not (along with an error message if something goes wrong).
// the track name, artists’ names, and album name,
// whether the player is currently paused or playing a track (we’ll use this to change the play/pause button),
// the current progress of the track.

import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import Playlist from './Playlist'

export default class Player extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token:
        'BQAiZfKnD0UE8tAzNCQ6ey-cvfHcuZGmp4FFMsWeNLpP2i_n9P0ozXb4eLrVbBIBOAs_igmyZ2uJqpmd9U9UlWRR9vZm7EY7SKCS4Qo_nsNGYEgg4MqbOfvXJUM06Rkdh4Afi8hHe4DtDGyz1D5Hdg3KBuh3ntN6iPNG7HPxlYU',
      deviceId: '',
      loggedIn: false,
      error: '',
      trackName: 'Track Name',
      artistName: 'Artist Name',
      albumName: 'Album Name',
      playing: false,
      position: 0,
      duration: 0
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.checkForPlayer = this.checkForPlayer.bind(this)
    this.playerCheckInterval = null
    this.onStateChanged = this.onStateChanged.bind(this)
    this.onPrevClick = this.onPrevClick.bind(this)
    this.onPlayClick = this.onPlayClick.bind(this)
    this.onNextClick = this.onNextClick.bind(this)
    this.transferPlaybackHere = this.transferPlaybackHere.bind(this)
  }
  handleLogin() {
    if (this.state.token !== '') {
      this.setState({loggedIn: true})
    }
    // check every second for the player.
    this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000)
  }

  checkForPlayer() {
    const {token} = this.state

    if (window.Spotify !== null) {
      // cancel the interval
      clearInterval(this.playerCheckInterval)
      this.player = new window.Spotify.Player({
        name: "Maddy's Spotify Player",
        getOAuthToken: cb => {
          cb(token)
        }
      })
      this.createEventHandlers()

      // finally, connect!
      this.player.connect()
    }
  }

  createEventHandlers() {
    this.player.on('initialization_error', e => {
      console.error(e)
    })
    this.player.on('authentication_error', e => {
      console.error(e)
      this.setState({loggedIn: false})
    })
    this.player.on('account_error', e => {
      console.error(e)
    })
    this.player.on('playback_error', e => {
      console.error(e)
    })

    // Playback status updates
    this.player.on('player_state_changed', state => this.onStateChanged(state))

    // Ready
    // this.player.on('ready', async data => {
    //   let {device_id} = data
    //   console.log('TCL: Player -> createEventHandlers -> data', data)
    //   console.log('Let the music play on!')
    //   await this.setState({deviceId: device_id})
    //   this.transferPlaybackHere()
    // })

    //pray
    this.player.on('ready', ({device_id}) => {
      console.log('Ready with Device ID', device_id)
      const {token, spotify_uri} = this.state

      const play = ({
        spotify_uri,
        playerInstance: {_options: {getOAuthToken, id}}
      }) => {
        getOAuthToken(access_token => {
          fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
            method: 'PUT',
            body: JSON.stringify({uris: [spotify_uri]}),
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${access_token}`
            }
          })
        })
      }
      play({
        playerInstance: player,
        spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr'
      })
    })

    // Connect to the player created beforehand, this is equivalent to
    // creating a new device which will be visible for Spotify Connect
    // this.player.connect()
    this.player.connect().then(success => {
      if (success) {
        console.log('The Web Playback SDK successfully connected to Spotify!')
      }
    })
  }

  onStateChanged(state) {
    // if we're no longer listening to music, we'll get a null state.
    console.log(state)
    if (state !== null) {
      const {
        current_track: currentTrack,
        position,
        duration
      } = state.track_window
      const trackName = currentTrack.name
      const albumName = currentTrack.album.name
      const artistName = currentTrack.artists
        .map(artist => artist.name)
        .join(', ')
      const playing = !state.paused
      this.setState({
        position,
        duration,
        trackName,
        albumName,
        artistName,
        playing
      })
    }
  }
  onPrevClick() {
    this.player.previousTrack()
  }

  onPlayClick() {
    console.log(this.player)
    this.player.togglePlay()
  }

  onNextClick() {
    this.player.nextTrack()
  }

  transferPlaybackHere() {
    const {deviceId, token} = this.state
    console.log('TCL: Player -> transferPlaybackHere -> this.state', this.state)
    // await axios.put('https://api.spotify.com/v1/tracks', {
    //   headers: {
    //     authorization: `Bearer ${token}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     device_ids: [deviceId],
    //     play: true
    //   })
    // })
    // const {data} = await axios.get('https://api.spotify.com/v1/tracks')
    // console.log(data)
    fetch('https://api.spotify.com/v1/me/player', {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        device_ids: [deviceId],
        play: true
      })
    })
  }

  render() {
    const {
      token,
      artistName,
      trackName,
      albumName,
      loggedIn,
      error,
      playing
    } = this.state
    console.log(this.state)
    return (
      <div>
        <div>
          <h2>Now Playing</h2>
        </div>
        {error && <p>Error: {error}</p>}

        {loggedIn ? (
          <div>
            <p>Artist: {artistName}</p>
            <p>Track: {trackName}</p>
            <p>Album: {albumName}</p>
            <p>
              <button type="button" onClick={() => this.onPrevClick()}>
                Previous
              </button>
              <button type="button" onClick={() => this.onPlayClick()}>
                {playing ? 'Pause' : 'Play'}
              </button>
              <button type="button" onClick={() => this.onNextClick()}>
                Next
              </button>
            </p>
          </div>
        ) : (
          <div>
            <p className="App-intro">
              Enter your Spotify access token. Get it from{' '}
              <a href="https://beta.developer.spotify.com/documentation/web-playback-sdk/quick-start/#authenticating-with-spotify">
                here
              </a>
              .
            </p>
            <p>
              <input
                type="text"
                value={token}
                onChange={e => this.setState({token: e.target.value})}
              />
            </p>
            <p>
              <button type="button" onClick={() => this.handleLogin()}>
                Go
              </button>
            </p>
          </div>
        )}
        <hr />
        <Playlist />
      </div>
    )
  }
}
