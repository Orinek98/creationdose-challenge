import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom';
import { StoreContext } from '../../../utils/store';
import {BiArrowBack} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';

const Credits = () => {
    const params = useParams();
    const {id} = params;
    const {favourite, addOrRemove} = useContext(StoreContext);
    const nav = useNavigate();

    const [movie, setMovie] = useState({
      id: '',
      original_title: '',
      year: '',
      overview: '',
      poster: '',
      vote_average: ''
    });


    const [credits, setCredits] = useState({
      director: "N/D",
      writers: "N/D",
      cast: "N/D",
    });

    const fetchCredits = async () =>{
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=7a9419a5b1cfc67fc13b7f73d489bddd&language=en-US`)
        .then((res) => res.json())
        .then((data) => setCredits({...credits, 
          director : data.crew.filter(el => el.job==="Director")[0]?.name, 
          writers : data.crew.filter(el => el.job==="Screenplay"||el.job==="Theatre Play")[0]?.name, 
          cast : data.cast[0]?.name+" "+data.cast[1]?.name+" "+data.cast[2]?.name}));
    }

    const fetchMovie = async () => {
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=7a9419a5b1cfc67fc13b7f73d489bddd&language=en-US`)
          .then((res) => res.json())
          .then((data) => setMovie({...movie,
            id: data.id,
            original_title: data.original_title,
            year: data.release_date,
            overview: data.overview,
            backdrop_path: data.backdrop_path,
            vote_average: data.vote_average,
            runtime: data.runtime}));
    }

    const fetchFav = async () => {
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=7a9419a5b1cfc67fc13b7f73d489bddd&language=en-US`)
          .then((res) => res.json())
          .then((data) => console.log(data))
    }

    useEffect(() => {
        fetchMovie();
        fetchCredits();
        fetchFav();
    },[])


  return (
    <>
      <div className='z-10 fixed flex justify-between items-center h-16 w-screen bg-sky-400 px-8'>
              <BiArrowBack onClick={()=>nav("/home")} className='text-white w-8 h-8 cursor-pointer' />
              <Link to="/home"><h2 className=' text-white text-3xl font-medium'>MyWatchList</h2></Link>
        </div>
      <div className={`flex flex-col bg-sky-100 h-screen`}>
        <div className='flex justify-center mt-28'>
          <img className="w-[700px] object-contain rounded-lg xs:p-4" alt="movie-poster" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}/>
        </div>
        <section className='bg-sky-100 px-10 pt-10'>
          <h1 className='text-4xl'>{movie.original_title} ({movie.year.substring(0,4)})</h1>
          <p className='bg-sky-100 text-xl p-1 xs:mt-5'>{movie.overview}</p>
          <button className='bg-sky-50 hover:bg-sky-200 text-gray-700 font-medium mt-2 py-2 px-4 rounded hover:cursor-pointer xs:mt-5' onClick={() =>addOrRemove(movie)}>{favourite[0].find((x) => x.id===movie.id) ? "Remove from Watchlist" : "Add to Watchlist"}</button>
        </section>
        <section className='bg-sky-100 flex flex-col p-10'>
          <h1 className='text-2xl xs:text-xl'>Director:<h2 className='inline ml-3 text-xl xs:text-lg'>{credits.director}</h2> </h1>
          <h1 className='text-2xl xs:text-xl'>Writer:<h2 className='inline ml-3 text-xl xs:text-lg'>{credits.writers}</h2></h1>
          <h1 className='text-2xl xs:text-xl'>Cast:<h2 className='inline ml-3 text-xl xs:text-lg'>{credits.cast} </h2></h1>
        </section>
      </div>
    </>
  )
}

export default Credits