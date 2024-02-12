import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

const MovieCard = ({ title, desc, posterUrl, date, id }) => {
  return (
  
    <Card sx={{ width: 250, height: 400, borderRadius: 5, margin: 1, '&:hover': { boxShadow: '10px 10px 20px #ccc' } }}>
      <CardMedia
        component="img"
        height="120"
        image={posterUrl}
        alt=""
        className="zoomedImage"
        style={{ objectFit: 'cover', height: '50%' }}
      />
     

      <CardContent>
        <Typography variant="h6" color="text.primary" className='text-ellipsis' gutterBottom>
          {title}
        </Typography>



        {/* <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography> */}

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {desc}
        </Typography>

        <Typography variant="body3" color="text.dark">
          released on:{new Date(date).toDateString()}
        </Typography>
      </CardContent>

      <Box className="flex justify-center">
        <CardActions sx={{ margin: 'auto', textAlign: 'center', marginBottom: "2" }} className=" bg-[var(--blue)] rounded-2xl">
          <Button size="small" className=" mt-2  text-white !important ">
            <Link to={`/booking/${id}`} className=' text-white !important '>
              Book Now
            </Link>
          </Button>


        </CardActions>
      </Box>
    </Card>

  );
};

export default MovieCard;



