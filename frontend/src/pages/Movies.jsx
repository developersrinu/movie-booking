// Movies.jsx
import React, { useState, useEffect } from 'react';
import getAllMovies from '../Apis/api-helper';
import { Box } from '@mui/material';
import MovieCard from '../Components/MovieCard';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const allMovies = await getAllMovies();
                const filteredMovies = allMovies.filter(movie =>
                    movie.title.toLowerCase().includes(query.toLowerCase())
                );
                setMovies(filteredMovies)
            } catch (error) {
                console.log('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, [query]);

    // // Filter movies based on the current query value whenever it changes
    // useEffect(() => {
    //     const filteredMovies = movies.filter(movie =>
    //         movie.title.toLowerCase().includes(query.toLowerCase())
    //     );
    //     setMovies(filteredMovies);
    // }, [query]); // Only depend on the query state for filtering

    console.log(query)

    return (
        <div className=''>
            <Box className="text-center w-3/5 h-20 text-white flex justify-center items-center m-auto mt-1 rounded-2xl">
                <input
                    type="text"
                    className="inptype outline-none bg-transparent mr-auto placeholder-gray-300 text-lg border-b border-gray-300 px-4 py-2 focus:border-['var(-blue)]"
                    placeholder="Search movie name"
                    value={query} // Controlled input value
                    onChange={(e) => setQuery(e.target.value)}
                />
            </Box>

            <Box
                display={'flex'}
                width={'80%'}
                justifyContent={'center'}
                flexWrap={'wrap'}
                margin={'auto'}
                marginTop={'20px'}
                marginBottom={2}
            >
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        title={movie.title}
                        desc={movie.desc}
                        posterUrl={movie.posterUrl}
                        casts={movie.actors}
                        date={movie.releaseDate}
                        id={movie._id}
                    />
                ))}
            </Box>
        </div>
    );
};

export default Movies;



