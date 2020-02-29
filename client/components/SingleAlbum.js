import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gotSingleAlbum} from '../store/album'
import {Link} from 'react-router-dom'

export class SingleAlbum extends Component {
  componentDidMount() {
    let id = this.props.match.params.albumId
    console.log('CDM', id)
    this.props.getSingleAlbum(id)
    console.log('props?', this.props)
  }
  render() {
    const {album} = this.props ? this.props : {}
    const artist = album.artist ? album.artist : {}
    // const { tracks } = album ? album : null
    // console.log("singleAlbum - tracks", tracks)
    return (
      <div>
        <h2>Album: {album.name}</h2>
        <Link to={`/artists/${artist.id}`}>
          <span>By: {artist.name}</span>
        </Link>
        <h3>Tracks:</h3>
        {album.tracks
          ? album.tracks.map(track => {
              return (
                <div key={track.id}>
                  <ol>{track.name}</ol>
                </div>
              )
            })
          : 'no tracks'}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  album: state.album
})

const mapDispatchToProps = dispatch => ({
  getSingleAlbum: albumId => dispatch(gotSingleAlbum(albumId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleAlbum)
