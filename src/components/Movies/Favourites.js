import React,{ useContext, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { StoreContext } from '../../utils/store';
import {AiFillStar} from 'react-icons/ai'
import {BsTrash} from 'react-icons/bs'

const Favourites = ({movie}) => {
    const {addOrRemove} = useContext(StoreContext);
    const [duration, setDuration] = useState('');

    const fetchDet = async () => {
        fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=7a9419a5b1cfc67fc13b7f73d489bddd&language=en-US`)
        .then((res) => res.json())
        .then((data) => setDuration(data.runtime))
    }

    useEffect(() =>{
        fetchDet()
    },[])
    return (
        <>
            <div className="lg:w-60 lg:max-h-54 bg-white shadow-lg p-5 rounded-xl">
                    <Link to={`/credits/${movie.id}`}><img className="h-28 rounded-md" alt="movie-poster" src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}/></Link>
                    <section className='flex justify-between'>
                        <div className='flex flex-col justify-evenly p-3'>
                            <h1 className='text-xl font-sans font-medium'>{movie.original_title}</h1>
                            <h1 className='text-lg font-sans'><AiFillStar className='inline text-yellow-400 text-xl mb-1 mr-1'/>{movie.vote_average}/10</h1>
                        </div>
                        <div className='flex flex-col justify-end items-end'>
                            <h1 className='text-sm font-sans mb-3'>{duration || movie.runtime} min</h1>
                            <button className='' onClick={() =>addOrRemove(movie)}><BsTrash className='w-7 h-7'/></button>
                        </div>
                    </section>
            </div>
        </>
      )
}

export default Favourites