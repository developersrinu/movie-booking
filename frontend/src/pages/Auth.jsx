import React from 'react';
import { Box } from '@mui/material';
import AuthForm from '../Components/AuthForm';
import { sendUserAuthRequest } from '../Apis/api-helper';
import { toast } from 'react-toastify';
import { useDispatch} from 'react-redux';
import { userLogin } from '../redux-store/store';

const Auth = () => {
  const dispatch = useDispatch();

  const onResRecevied = (res) => {
    console.log(res);
    const isLogedin = res.user ? true : false; // Assuming res.user exists when logged in
    dispatch(userLogin());
    localStorage.setItem('userId', res.user);
    console.log('isLogedin', isLogedin); // Use the updated state directly
  };

  const getData = (Udata) => {
    console.log('auth', Udata);
    sendUserAuthRequest(Udata.formData, Udata.signup)
      .then((res) => {
        console.log("Response:", res.message, res.user);
        onResRecevied(res);
        window.location.href = '/movies'
        toast.success(res.message);
      })
      .catch((error) => {
        console.log("Error during authentication:", error.message);
        toast.error(error.message);
      });
  };

  return (
    <Box className="">
      <AuthForm onSubmit={getData} isAdmin={false} />
    </Box>
  );
};

export default Auth;
