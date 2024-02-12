import axios from 'axios';

const getAllMovies = async () => {
  try {
    const response = await axios.get("http://localhost:5000/movie/allmoives");  // Replace 'your_api_endpoint' with the actual endpoint
    const movies = response.data;
    return movies;

  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};
export default getAllMovies;

export const sendUserAuthRequest = async (data, signup) => {
  let res;

  try {
    res = await axios.post(`/user/${signup ? "signup" : "signin"}`, {
      username: signup ? data.username : "",
      email: data.email,
      password: data.password,
    });
    console.log('data=', data)
  } catch (error) {
    console.error(error);
  }

  if (res && (res.status === 200 || res.status === 201)) {
    console.log('Authentication successful');
  } else {
    console.log('Invalid error');
  }

  const resData = res.data
  return resData
};

export const sendUserAdminRequest = async (data) => {
  console.log('data', data.formData.email)

  try {
    const res = await axios.post("/admin/signin", {
      email: data.formData.email,
      password: data.formData.password
    });

    console.log('res', res)

    if (res && (res.status === 200 || res.status === 201)) {
      console.log('Authentication successful');
    } else {
      console.log('Invalid error');
    }

    const resData = await res.data;
    return resData;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to be caught in the calling code
  }
};

export const getAllBookingofUser = async (id) => {
  let bookings;
  try {
    bookings = await axios.get(`/user/bookings/${id}`)
    console.log('fetching sucessful')
    return bookings.data.bookings
  }
  catch (error) {
    console.log('fetching unsucessfull')
  }

}

export const getUserById = async (id) => {
  try {
    const res = await axios.get(`/user/${id}`);
    console.log('User fetching successful');
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error; // Re-throwing the error for handling in the caller
  }
};

export const deleteBookingbyId = async (id) => {
  try {
    const res = await axios.delete(`/booking/${id}`);
    console.log(res.data);
    return res.data.message;
  } catch (error) {
    console.log(error);
    throw error; // Optionally rethrow the error for the caller to handle
  }
};

const token = localStorage.getItem('token')

export const addMovie = async (data) => {
  let response;
  try {
    response = await axios.post('/movie/add',{
      title:data.title,
      desc:data.desc,
      posterUrl:data.posterUrl,
      releaseDate:data.releaseDate,
      actors:data.actors,
      admin:localStorage.getItem('adminId')
    },{headers:{
      Authorization:`Bearer ${token}`
    }});
    console.log('Movie added');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAdminById = async (adminId) => {
  try {
    const res = await axios.get(`/admin/${adminId}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error; 
  }
};




export const getMovieDetails = async (id) => {
  try {
    const response = await axios.get(`movie/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};













