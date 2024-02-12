import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';  // Import useEffect
import MovieCard from '../Components/MovieCard';  // Adjust the path based on your project structure
import getAllMovies from '../Apis/api-helper';
import poster1 from '../images/147874-marvel-logo-wallpaper.jpg';
import poster2 from '../images/disney-tickets_booking-with-us-top_img_m_42f5c791.jpg';
import poster3 from '../images/20220408_doctor_strange_header.jpg';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'




const Homepage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const allMovies = await getAllMovies();
        setMovies(allMovies);
      } catch (error) {
        console.log('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const arr = [poster1, poster2, poster3]
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === arr.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 3000);
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <Box height="100%" width="100%" margin="auto" marginTop={1}>
      <Box width="80%" height="35vh" margin={"auto"} padding={1}>
        {/* -------------------- */}
        <motion.img src={arr[currentIndex]} alt="img" style={{ width: '100%', height: '100%' }}
          initial={{ x: '5', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-100%', opacity: 0 }}
          transition={{ duration: 2 }}
        />


        {/* --------------------- */}


        <Box padding={0.4} margin="auto" textAlign="center">
          <Typography variant="h4" style={{ fontSize: '1.5rem' }}>
            new release
          </Typography>
        </Box>

      </Box>


      <Box display={'flex'} width={"80%"} justifyContent={"center"} flexWrap={"wrap"} margin={"auto"} marginTop={"20px"} marginBottom={2}>
        {movies.slice(0, 3).map((movie) => (
          
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
      <center>
        <Link to='/movies' className=' border-2 border-solid border-black  text-black w-fit p-2 rounded-2xl m-2' style={{ marginTop: '2px !important' }}>
          Veiw All Movies
        </Link>
      </center>

    </Box>
  );
};

export default Homepage;


