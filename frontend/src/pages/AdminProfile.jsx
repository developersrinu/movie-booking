import React, { useEffect, useState } from 'react';
import { getAdminById } from '../Apis/api-helper';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { toast } from 'react-toastify';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { motion } from 'framer-motion'

const AdminProfile = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const adminId = localStorage.getItem('adminId');

  useEffect(() => {
    getAdminById(adminId)
      .then((res) => {
        setAdminData(res);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error fetching admin data');
      });
  }, [adminId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box width={'100%'} display={'flex'} flexWrap={'wrap'}>
      {adminData && adminData.admin.addedMovies.length > 0 && (
        <>
          <Box width={'30%'} flexDirection={'column'} justifyContent={''} alignContent={'flex-start'} margin={''}>
            <AccountCircleIcon sx={{ fontSize: '10rem', ml: '25%', color:'var(--blue)' }} />
            <Typography padding={1} maxWidth={'auto'} textAlign={'center'} border={'2px solid var(--blue)'} borderRadius={6} margin={1}>
              {adminData.admin.email}
            </Typography>
          </Box>

          <Box width={'70%'} display={'flex'} justifyContent={'center'} marginTop={3} flexDirection={'column'}>
            <Typography variant='h3' fontStyle={'verdana'} textAlign={'center'}>
              Added movies
            </Typography>
            <Box margin={'auto'} display={'flex'} flexDirection={'column'} width={'80%'}>
              <List>
                {adminData.admin.addedMovies.map((movie, index) => (
                  <motion.div
                  initial={{ x: '25', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration:0.2, delay: index, ease: "easeInOut" }}
                  >
                    <ListItem key={index} sx={{ bgcolor: 'var(--blue)', color: 'white', textAlign: "center", margin: 1, borderRadius: 4, fontWeight: 700 }}
                      initial={{ x: '25', opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2, delay: index, ease: "easeInOut" }}
                    >
                      <ListItemText sx={{ margin: 1, width: "auto", textAlign: 'left' }}>
                        Movie Name : {movie.title}
                      </ListItemText>

                      <ListItemText sx={{ margin: 1, width: "auto", textAlign: 'left' }}>
                        Release Date: {new Date(movie.releaseDate).toDateString()}
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

export default AdminProfile;