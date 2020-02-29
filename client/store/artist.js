import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_SINGLE_ARTIST = 'GET_SINGLE_ARTIST'
const GET_ARTISTS = 'GET_ARTISTS'

/**
 * INITIAL STATE
 */
const initialState = {
  artists: []
}

/**
 * ACTION CREATORS
 */
const getArtists = artists => ({
  type: GET_ARTISTS,
  artists
})
const getSingleArtist = artist => ({
  type: GET_SINGLE_ARTIST,
  artist
})

/**
 * THUNK CREATORS
 */

export const gotArtists = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/artists')
    dispatch(getArtists(data))
  } catch (error) {
    console.error(error)
  }
}

export const gotSingleArtist = artistId => async dispatch => {
  try {
    console.log('IN THE SINGLE ARTIST THUNK')
    const {data} = await axios.get(`/api/artists/${artistId}`)
    dispatch(getSingleArtist(data))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export const artistReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTISTS:
      return action.artists
    default:
      return state
  }
}

export const singleArtistReducer = (artist = {}, action) => {
  console.log('single reducer', action)
  switch (action.type) {
    case GET_SINGLE_ARTIST:
      return action.artist
    default:
      return artist
  }
}
