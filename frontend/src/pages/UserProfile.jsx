import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { getAllBookingofUser, getUserById, deleteBookingbyId } from '../Apis/api-helper';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'



const UserProfile = () => {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState({});
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    getUserById(userId)
      .then((userData) => {
        setUser(userData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  useEffect(() => {
    getAllBookingofUser(userId)
      .then((res) => {
        console.log(res);
        setBookings(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);



  const handledeleteBookingbyId = (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      // Assuming you have an API function called `deleteBookingById`
      deleteBookingbyId(bookingId)
        .then((res) => {
          toast.success('Booking deleted successfully');
          console.log(res.message);
          window.location.reload();

        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <Box width={'100%'} display={'flex'} flexWrap={'wrap'}>
      {bookings && bookings.length > 0 && (
        <>
          <Box width={'30%'} flexDirection={'column'} justifyContent={''} alignContent={'flex-start'} margin={''} >
            <AccountCircleIcon sx={{ fontSize: "10rem", ml: '25%', color: 'var(--blue)' }} />
            <Typography padding={1} maxWidth={'auto'} textAlign={'center'} border={'2px solid var(--blue)'} borderRadius={6} margin={1}>
              {user.user.username}
            </Typography>
            <Typography padding={1} maxWidth={'auto'} textAlign={'center'} border={'2px solid var(--blue)'} borderRadius={6} margin={1}>
              {user.user.email}
            </Typography>
          </Box>

          <Box width={'70%'} display={'flex'} justifyContent={'center'} marginTop={3} flexDirection={'column'}>
            <Typography variant='h3' fontStyle={'verdana'} textAlign={'center'}>
              My Bookings
            </Typography>
            <Box margin={'auto'} display={'flex'} flexDirection={'column'} width={'80%'}>
              <List>
                {bookings.map((booking, index) => (

                  <motion.div
                    initial={{ x: '25', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration:0.2, delay: index, ease: "easeInOut" }}
                  >
                    <ListItem key={index} sx={{ bgcolor: 'var(--blue)', color: 'white', textAlign: "center", margin: 1, borderRadius: 4, }}>
                      <ListItemText sx={{ margin: 1, width: "auto", textAlign: 'left' }}>
                        {booking.movie.title}
                      </ListItemText>

                      <ListItemText sx={{ margin: 1, width: "auto", textAlign: 'left' }}>
                        seat no : {booking.seatNumber}
                      </ListItemText>

                      <ListItemText sx={{ margin: 1, width: "auto", textAlign: 'left' }}>
                        Booking Date: {new Date(booking.date).toDateString()}
                      </ListItemText>

                      <ListItemText sx={{ margin: 1, width: "auto", textAlign: 'left' }}>
                        <DeleteIcon fontSize='large' onClick={() => handledeleteBookingbyId(booking._id)} />
                      </ListItemText>
                    </ListItem>
                  </motion.div>
                ))}
              </List>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default UserProfile;







