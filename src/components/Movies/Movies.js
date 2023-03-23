import Movie from './Movie/Movie';
import Carousel from 'react-elastic-carousel'

const Movies = ({movies}) => {

    const breakPoints = [
        { width: 1, itemsToShow: 2 },
        { width: 550, itemsToShow: 3, itemsToScroll: 2 },
        { width: 768, itemsToShow: 5 },
        { width: 1200, itemsToShow: 6 }
      ];
    return(
        <main className='p-2'>
            <Carousel breakPoints={breakPoints}>
                {movies.sort((a, b) => (a.release_date < b.release_date) ? 1 : (b.release_date < a.release_date) ? -1 : 0).map((movie) =>(
                    <div className='flex flex-col' key={movie.id}>
                            <Movie movie={movie} />
                    </div>
                ))}
                </Carousel>
        </main>
    )
}

export default Movies;