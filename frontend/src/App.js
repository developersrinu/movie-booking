// import React, { useEffect } from 'react';
// import { Route, Routes } from 'react-router-dom';
// import Homepage from './pages/Homepage.jsx';
// import Movies from './pages/Movies.jsx';
// import Header from './Components/Header.jsx';
// import Auth from './pages/Auth.jsx';
// import Admin from './pages/Admin.jsx';
// import { ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { adminLogin, userLogin } from './redux-store/store.js';




// const App = () => {

//   const dispatch = useDispatch()

//   const isAdminLogedIn = useSelector(()=>state.admin.isLogedIn)
//   const isUserLogedIn = useSelector(()=>state.user.isLogedIn)

//   console.log(isAdminLogedIn,isUserLogedIn)


//   useEffect(()=>{
//     if(localStorage.getItem('userId')){
//          dispatch(userLogin)
//     }else if(localStorage.getItem('adminId')){
//       dispatch(adminLogin)
//     }

//   },[])



 

//   return (
//     <div>
//       <Header/>
//       <Routes>
//         <Route path="/" element={<Homepage />} />
//         <Route path="/movies" element={<Movies />} />
//         <Route path="/auth" element = {<Auth/>}/>
//         <Route path='/Admin' element = {<Admin/>}/>
//       </Routes>
//       <ToastContainer/>

//     </div>
//   );
// };

// export default App;


import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import Movies from './pages/Movies.jsx';
import Header from './Components/Header.jsx';
import Auth from './pages/Auth.jsx';
import Admin from './pages/Admin.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin, userLogin } from './redux-store/store.js';
import AdminProfile from './pages/AdminProfile.jsx';
import Booking from './pages/Booking.jsx';
import UserProfile from './pages/UserProfile.jsx';
import AddMovie from './pages/AddMovie.jsx';
import Notfound from './pages/Notfound.jsx';

const App = () => {
  const dispatch = useDispatch();

  // Correctly reference state slices
 
  const isUserLogedIn = useSelector(state => state.user.isLogedIn);
  const isAdminLogedIn = useSelector(state => state.admin.isLogedIn);
  console.log('ad',isAdminLogedIn,'user',isUserLogedIn)

  useEffect(() => {
    // Dispatch action functions
    if (localStorage.getItem('userId')) {
      dispatch(userLogin());
    } else if (localStorage.getItem('adminId')) {
      dispatch(adminLogin());
    }
  }, [dispatch]); // Include dispatch in the dependencies array to fix warning

  return (
    <div>
      <Header />
      <Routes>

        <Route path="/" element={<Homepage />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/logout" element={<Homepage />} />
        <Route path="/userprofile/:id" element={<UserProfile/>} />
        <Route path="/adminprofile" element={<AdminProfile/>} />
        <Route path="/booking/:id" element={<Booking/>} />
        <Route path="/addmoive" element = {<AddMovie/>}/>
        <Route path = '*' element = {<Notfound/>}/>
  
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;




