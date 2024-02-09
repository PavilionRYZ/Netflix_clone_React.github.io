/* eslint-disable no-unused-vars */
import React from 'react'
import './Header.scss'
import logo from '../../Assets/netflix-logo.png'
import {Link} from 'react-router-dom'
import {ImSearch} from 'react-icons/im'
const Header = () => {
  return (
    <nav className='header'>
      <img src={logo} alt='logo'/>
      <div>
        <Link to="/tvshows">Tv Shows</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/recent">Recently Added</Link>
        <Link to="/mylist">My List</Link>
      </div>
      <ImSearch/>
    </nav>
  )
}

export default Header
