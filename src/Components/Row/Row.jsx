/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import "./Row.scss"
import Card from '../Card/Card';

const imgurl = " https://image.tmdb.org/t/p/original/";

const Row = (
    {title,arr=[]
   }
) => {
    return (
        <div className='row'>
            <h1> {title}</h1>
            <div>
            {
                arr.map((item, index) => (
                <Card key={index} img={`${imgurl}/${item.poster_path}`}/>
                ))
            }
             
            </div>
        </div>
    )
}


export default Row
