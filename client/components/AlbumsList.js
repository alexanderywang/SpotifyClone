import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gotAlbums} from '../store'
import {Link} from 'react-router-dom'

class AlbumsList extends Component {
  componentDidMount() {
    this.props.getAlbums()
  }

  render() {
    console.log('Album list', this.props.albums)
    const {albums} = this.props

    return (
      <div>
        <h1>Albums List</h1>
        <div>
          {albums.length ? (
            albums.map(album => {
              return (
                <div key={album.id}>
                  <Link to={`/albums/${album.id}`}>
                    <span>{album.name}</span>
                  </Link>
                  <ul>by: {album.artist.name}</ul>
                  <hr />
                </div>
              )
            })
          ) : (
            <h2>No Albums</h2>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  albums: state.albums
})

const mapDispatchToProps = dispatch => ({
  getAlbums: () => dispatch(gotAlbums())
})

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsList)
