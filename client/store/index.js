import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import {albumReducers, singleAlbumReducer} from './album'
import {artistReducers, singleArtistReducer} from './artist'

const reducer = combineReducers({
  user,
  albums: albumReducers,
  album: singleAlbumReducer,
  artists: artistReducers,
  artist: singleArtistReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './album'
export * from './artist'
