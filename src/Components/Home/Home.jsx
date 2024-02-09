/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect,useState } from 'react'
import './Home.scss'
import Row from '../Row/Row'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { FaPlay } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

const api_key = "6d234080fb19b5fdb98029f7929b1842";
const base_url = "https://api.themoviedb.org/3";
const imgurl = " https://image.tmdb.org/t/p/original/";
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";
const genresUrl="genre/movie/list" 
const Home = () => {

  const [upcomingMovies,setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies]= useState([]);
  const [popularMovies, setPopularMovies]= useState([]);
  const [topRatedMovies, setTopRatedMovies]= useState([]);
  const [genres, setGenres]= useState([]);
  const [movies, setMovies] = useState([]);
  
  // Get the data for each category of movies

  useEffect(()=>{
    const fetchUpcoming = async()=>{
      const {data:{results}} = await axios.get(`${base_url}/movie/${upcoming}?api_key=${api_key}&language=en-US&page=1`);
      setUpcomingMovies(results)
      console.log(upcomingMovies);
    }

    const fetchNowPlaying = async()=>{
      const {data:{results}} = await axios.get(`${base_url}/movie/${nowPlaying}?api_key=${api_key}&language=en-US&page=1`);
      setNowPlayingMovies(results)
      console.log(nowPlayingMovies);
    }

    const fetchPopular = async()=>{
      const {data:{results}} = await axios.get(`${base_url}/movie/${popular}?api_key=${api_key}&language=en-US&page=1`);
      setPopularMovies(results);
      console.log(popularMovies);
    }

    const fetchTopRated = async()=>{
      const {data:{results}} = await axios.get(`${base_url}/movie/${topRated}?api_key=${api_key}&language=en-US&page=1`); 
      setTopRatedMovies(results);
      console.log(topRatedMovies);
    }

    const fetchGenres = async()=>{
      const {data:{genres}} = await axios.get(`${base_url}/${genresUrl}?api_key=${api_key}&language=en-US`);
      setGenres(genres);
      console.log(genres);
    }

    // create a carosoul for showing latest movies in progress
    const endpoint = `${base_url}/movie/${nowPlaying}?api_key=${api_key}&language=en-US&page=1`;

    const fetchScroll = async()=>{
      try {
        const response = await axios.get(endpoint);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    Promise.all([fetchUpcoming(),
       fetchNowPlaying(), 
       fetchPopular(), fetchTopRated(), 
       fetchGenres(),
       fetchScroll()]).then(()=>{});


    // fetchUpcoming();
    // fetchNowPlaying();
    // fetchPopular();
    // fetchTopRated();
    // fetchGenres();
  }, [])

  return (

    <section className='home'>
      <div className="banner"
      style={
        {
          backgroundImage: popularMovies[0] && `url(${imgurl+popularMovies[0].backdrop_path})`
          
        }
      } 
      >
        {popularMovies[0] && (<h1>{popularMovies[0].original_title}</h1>)}
        {popularMovies[0] && (<p>{popularMovies[0].overview}</p>)}

        <div >
        <button><FaPlay/> Play</button>
        <button>My List <FaPlus/> </button>

        </div>
      </div>
      <Row title={"Upcoming Movies"} arr={upcomingMovies}/>
      <Row title={"Now Playing"} arr={nowPlayingMovies}/>
      <Row title={'Popular'} arr={popularMovies} />
      <Row title={'Top Rated'} arr={topRatedMovies} />

      <div className="genre">
        {genres.map((item,index)=>{
          return <Link key={index} to={`/genre/${item.id}`}>{item.name}</Link>
        })}
      </div>
    </section>
  )
}

export default Home
