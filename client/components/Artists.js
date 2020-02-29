import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gotArtists} from '../store'
import {Link} from 'react-router-dom'

class ArtistsList extends Component {
  componentDidMount() {
    this.props.getArtists()
  }

  render() {
    console.log('Artist list', this.props)
    const {artists} = this.props

    return (
      <div>
        <h1>Artists List</h1>
        <div>
          {artists.length ? (
            artists.map(artist => {
              return (
                <div key={artist.id}>
                  <Link to={`/artists/${artist.id}`}>
                    <span>{artist.name}</span>
                  </Link>
                  <ul>
                    Albums:{' '}
                    {artist.albums.map(album => (
                      <div key={album.id}>
                        <Link to={`/albums/${album.id}`}>
                          <span>{album.name}</span>
                        </Link>
                      </div>
                    ))}
                  </ul>
                  <hr />
                </div>
              )
            })
          ) : (
            <h2>No Artists</h2>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  artists: state.artists,
  albums: state.albums
})

const mapDispatchToProps = dispatch => ({
  getArtists: () => dispatch(gotArtists())
})

export default connect(mapStateToProps, mapDispatchToProps)(ArtistsList)
