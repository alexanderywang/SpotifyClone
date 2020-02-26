import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_SINGLE_ALBUM = 'GET_SINGLE_ALBUM'
const GET_ALBUMS = 'GET_ALBUMS'

/**
 * INITIAL STATE
 */
const initialState = {
  albums: []
}

/**
 * ACTION CREATORS
 */
const getAlbums = albums => ({
  type: GET_ALBUMS,
  albums
})
const getSingleAlbum = albumId => ({
  type: GET_SINGLE_ALBUM,
  albumId
})

/**
 * THUNK CREATORS
 */

export const gotAlbums = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/albums')
    dispatch(getAlbums(data))
  } catch (error) {
    console.error(error)
  }
}

export const gotSingleAlbum = albumId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/albums/${albumId}`)
    dispatch(getSingleAlbum(data))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
const albumreducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALBUMS:
      return action.albums
    case GET_SINGLE_ALBUM:
      return action.album
    default:
      return state
  }
}

export default albumreducers
