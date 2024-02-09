/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import "./Card.scss"
const Card = ({img}) => {
  return (
    <img className='card' src={img} alt='cover'/>
  )
}

export default Card
