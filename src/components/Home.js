import { useState, useEffect, useContext, useRef } from 'react';
import { StoreContext } from '../utils/store';
import { Navigate, Link} from 'react-router-dom';
import {AiOutlineMenu} from 'react-icons/ai'
import Movies from './Movies/Movies';
import Favourites from './Movies/Favourites';
import Sidebar from './Sidebar';

const Home = () => {
    const [search, setSearch] = useState("");
    const [movieList, setMovieList] = useState([]);
    const [movies, setMovies] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const isLogged = useRef(false);

    const {favourite} = useContext(StoreContext);


    
    const fetchMovies = async () => {
      fetch('https://api.themoviedb.org/3/movie/popular?api_key=7a9419a5b1cfc67fc13b7f73d489bddd&language=en-US&page=1')
          .then((res) => res.json())
          .then((data) => setMovies(data.results));
    }

    const fetchSearch = async (e) => {
      setSearch(e.target.value);
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=7a9419a5b1cfc67fc13b7f73d489bddd&language=en-US&page=1&include_adult=false&query=${search}`)
      .then((res) => res.json())
      .then((data) => setMovieList(data.results));
    }

    const fetchAuth = () =>{
      const loggedInUser = localStorage.getItem("authenticated");
        if (loggedInUser) {
          isLogged.current = true;
        }
    }
    
    useEffect(() => {
      fetchAuth();
      fetchMovies();
    },[]);
      
    if(!isLogged){
      return(
         <Navigate replace to="/login" />
      )
    }
    else {
      return (
        <>
            <div className='z-20 fixed flex justify-between items-center h-16 w-screen bg-sky-400 px-8'>
              <AiOutlineMenu onClick={()=>setIsOpen(!isOpen)} className='text-white w-8 h-8 cursor-pointer' />
              <Link to="/home"><h2 className=' text-white text-3xl font-medium'>MyWatchList</h2></Link>
            </div>

            <main className='flex pt-[48px] bg-sky-100'>
              {isOpen ? <Sidebar /> : null}
                <div className='flex flex-auto flex-col'>
                    <input className='shadow appearance-none border rounded w-64 py-2 px-3 ml-8 mt-14 text-gray-700 leading-tight' 
                            type="text" 
                            autoComplete='off' 
                            placeholder='Search Movies'
                            value={search}
                            onChange={fetchSearch}
                    />
                    <div>
                        {search.length !== 0 ? movieList?.map((movie) => {
                          return(
                            <div className='absolute w-64 ml-8 bg-white border rounded p-1'>
                              <Link to={`/credits/${movie.id}`}>{movie.title}</Link>
                            </div>)}) : null}
                    </div>
                    <h3 className='text-3xl font-sans ml-8 mt-10 mb-3'>New Relese</h3>
                    <Movies className="bg-sky-100" movies={movies} />
                    <h3 className='text-3xl font-sans ml-8 mt-10 mb-3'>WatchList</h3>
                    <div className="bg-sky-100 flex gap-2 flex-wrap p-2 ml-10">{favourite[0] ? favourite[0].map((fav) => {
                        return(
                                <div className="flex flex-col" key={fav.id}>
                                  <Favourites movie={fav} />
                                </div>)}) : null}
                    </div>
                </div>
            </main>
        </>
      )
    }
  
}

export default Home