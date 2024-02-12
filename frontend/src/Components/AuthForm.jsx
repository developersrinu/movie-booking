import React, { useState } from 'react';
import { Box, Dialog, FormLabel, TextField, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const AuthForm = ({ onSubmit, isAdmin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState({
    username:'',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({formData,signup: isAdmin ? false : isSignup});
  };
  console.log('formData',formData)

  return (
    <Dialog open={open} className='rounded-3xl'>
      <Typography sx={{ ml: 'auto', padding: 1 }} dismiss>
        <IconButton onClick={handleClose}><CloseIcon /></IconButton>
      </Typography>
      <Typography variant='h4' textAlign={'center'} sx={{ mt: 1,color:'var(--blue)' }}>
        {isSignup ? 'Register' : 'Login'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" justifyContent="" flexDirection="column" alignItems="" width={400} margin="auto" padding={1}>

          {!isAdmin && isSignup && (
            <>
              <FormLabel sx={{ mt: 1, mb: 1 }}>Name</FormLabel>
              <TextField
                margin='small'
                variant='standard'
                value={FormData.username}
                type="text"
                name="username"
                onChange={handleChange}
              />
            </>
          )}

          <FormLabel sx={{ mt: 1, mb: 1 }}>Email</FormLabel>
          <TextField
            margin='small'
            variant='standard'
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <FormLabel sx={{ mt: 1, mb: 1 }}>Password</FormLabel>
          <TextField
            margin='small'
            variant='standard'
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          {!isAdmin && isSignup && (
            <>
              <FormLabel sx={{ mt: 1, mb: 1 }}>Confirm Password</FormLabel>
              <TextField
                margin='small'
                variant='standard'
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </>
          )}

          <Button sx={{ mt: 1, borderRadius: 10, bgcolor: 'var(--blue)', color: 'white' }} type='submit' fullWidth variant='contained'>
            {isSignup ? 'Register' : 'Login'}
          </Button>


          {!isAdmin && (<>
            <Button
              sx={{ mt: 1, borderRadius: 10, bgcolor: '', opacity: 0.6, color: 'black' }}
              type='button'
              fullWidth
              variant=''
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? 'Switch to Login' : 'Switch to Register'}
            </Button>
          </>)}



        </Box>
      </form>
    </Dialog>
  );
};

export default AuthForm;





