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
const getSingleAlbum = album => ({
  type: GET_SINGLE_ALBUM,
  album
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
    console.log('IN THE SINGLE ALBUM THUNK')
    const {data} = await axios.get(`/api/albums/${albumId}`)
    dispatch(getSingleAlbum(data))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export const albumReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALBUMS:
      return action.albums
    default:
      return state
  }
}

export const singleAlbumReducer = (album = {}, action) => {
  console.log('single reducer', action)
  switch (action.type) {
    case GET_SINGLE_ALBUM:
      return action.album
    default:
      return album
  }
}
