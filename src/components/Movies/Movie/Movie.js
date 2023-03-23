import React,{ useContext } from 'react'
import {Link} from 'react-router-dom'
import { StoreContext } from '../../../utils/store';
import {AiOutlineStar, AiFillStar,AiOutlineMenu} from 'react-icons/ai'
import './Movie.css'

const Movie = ({movie}) => {
    const {favourite, addOrRemove} = useContext(StoreContext);

  return (
    <>
        
            <div className="bg-white lg:flex lg:flex-col text-center shadow-lg p-3 rounded-xl mx-2 m">
                <div>
                <Link to={`/credits/${movie.id}`}><img alt="movie-poster" src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}/></Link>
                </div>
                <div className='showhim'><AiOutlineMenu className='m-auto my-3' />
                    <div className='showme'>
                    <h2 className='font-sans'>{movie.original_title}</h2>
                    <p className='font-sans'>({(movie.release_date).substring(0,4)})</p>
                    <h1 className='font-sans'>Rating: {movie.vote_average}</h1>
                    <button className='mt-3' onClick={() =>addOrRemove(movie)}>{favourite[0].find((x) => x===movie) ? <AiFillStar /> : <AiOutlineStar />}</button>
                    </div>
                </div>
            </div>
    </>
  )
}

export default Movie