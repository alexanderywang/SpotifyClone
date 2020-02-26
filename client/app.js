import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

import {AlbumsList} from './components/AlbumsList'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
