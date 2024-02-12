
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../Apis/api-helper';
import { Box, Typography, FormLabel, TextField, Button as MuiButton, Modal } from '@mui/material';
import axios from 'axios';
import './style/addmovie.css'
import { toast } from 'react-toastify';


const Booking = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [bookingFormData, setBookingFormData] = useState({
        seatNumber: '',
        date: '',
    });
    const [show, setShow] = useState(false);
    const [selectedSeat, setSelectedSeat] = useState(null);
    
    useEffect(() => {
        getMovieDetails(id)
            .then((res) => {
                setMovie(res);
            })
            .catch((error) => console.log(error));
    }, [id]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        setBookingFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    function handleSubmit(e) {
        e.preventDefault();
        let bookingInfo = {
            movie: id,
            date: bookingFormData.date,
            seatNumber: selectedSeat, // Now use selectedSeat for seat number
            user: localStorage.getItem('userId')
        };
        axios.post('/booking', bookingInfo)
            .then((res) => {
                console.log(res.data);
                toast.success('Booking successful');

            })
            .catch((error) => {
                toast.error('Booking unsuccessful', error);
            });
    }

    // Render available seats
    const renderSeats = () => {
        const availableSeats = Array.from({ length: 100 }, (_, index) => index + 1);
        return availableSeats.map((seatNumber) => (
            <div
                key={seatNumber}
                className={`child ${selectedSeat === seatNumber ? 'green-bg' : ''}`}
                onClick={() => handleSeatSelection(seatNumber)}
            >
                {seatNumber}
            </div>
        ));
    };

    const handleSeatSelection = (seatNumber) => {
        setSelectedSeat(seatNumber);
    };

    return (
        <div>
            {movie && (
                <>
                    <Typography padding={2} fontFamily='fantasy' variant='h4' alignItems='center'>
                        <center> Book Tickets of Movie : {movie.title}</center>
                        <Box display='flex' justifyContent='center' alignItems={'self-start'} flexWrap={'wrap !important'} id='userProfile'>

                            <Box display='flex' justifyContent='center' flexDirection='column' paddingTop={3} width='50%' margin={'auto'}>
                                <img width='80%' height='300px' borderRadius="" src={movie.posterUrl} alt="img" className='bookImg ' />
                                <Box width={'80%'} marginTop={1} padding={1}>
                                    <Typography paddingTop={1} color={'var(--blue)'}>{movie.desc}</Typography>
                                    <Typography fontWeight={'semibold'} marginTop={1} color={'var(--blue)'}>
                                        Actors :
                                        {movie.actors && movie.actors.map((actor) => (
                                            <span> {actor} </span>
                                        ))}
                                    </Typography>
                                    <Typography fontWeight={'bold'} marginTop={1}>
                                        Release Day : {new Date(movie.releaseDate).toDateString()}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display='flex' justifyContent='flex-start' flexDirection='column' width='50%' marginTop={-14} margin={'auto'}>
                                <form onSubmit={handleSubmit}>

                                    <Box padding={5} margin={'-10px auto'} display={'flex'} flexDirection={'column'}>

                                       <MuiButton variant="contained" onClick={handleShow}  style={{ backgroundColor: "var(--blue)", margin: "" }}>
                                            select your seat
                                        </MuiButton>
                                        <Box marginBottom={3}></Box>


                                        <Modal
                                            open={show}
                                            onClose={handleClose}
                                            aria-labelledby="modal-title"
                                            aria-describedby="modal-description"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Box sx={{ width: 400, bgcolor: 'background.paper', p: 4 }}>
                                                <Typography id="modal-description" sx={{ mt: 2 }}>
                                                    <div className="parent">
                                                        {renderSeats()}
                                                    </div>
                                                </Typography>
                                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>

                                                    <MuiButton variant="contained" onClick={handleClose} sx={{ mr:2, mt:2, bgcolor:'var(--blue)'}}>
                                                        Close
                                                    </MuiButton>

                                                    <MuiButton type='submit' variant="contained" color="primary" sx={{ mr: 2, mt:2,bgcolor:'var(--blue)'}}>
                                                        Save
                                                    </MuiButton>
                                                </Box>
                                            </Box>
                                        </Modal>
                                        <FormLabel>Booking Date</FormLabel>
                                        <TextField
                                            name='date'
                                            type='date'
                                            margin='normal'
                                            variant='standard'
                                            value={bookingFormData.date}
                                            onChange={handleChange}
                                        />
                                        <MuiButton type='submit' variant="contained" sx={{ mt: 4, bgcolor: 'var(--blue)' }}>Book Now</MuiButton>
                                    </Box>
                                </form>
                            </Box>
                        </Box>
                    </Typography>
                </>
            )}
        </div>
    );
};

export default Booking;























































































// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getMovieDetails } from '../Apis/api-helper';
// import { Box, Typography, FormLabel, TextField, Button } from '@mui/material';
// import axios from 'axios';
// import { toast } from 'react-toastify'

// const Booking = () => {
//     const { id } = useParams();
//     const [movie, setMovie] = useState({});
//     const [myBooking, setMyBooking] = useState({})
//     const [bookingFormData, setBookingFormData] = useState({
//         seatNumber: '',
//         date: '',
//     });

//     console.log(bookingFormData)

//     const handleChange = (e) => {
//         setBookingFormData((prevData) => ({
//             ...prevData,
//             [e.target.name]: e.target.value,
//         }));
//     };

//     useEffect(() => {
//         getMovieDetails(id)
//             .then((res) => {
//                 setMovie(res);
//             })
//             .catch((error) => console.log(error));
//     }, [id]);

//     function handleSubmit(e) {
//         e.preventDefault()
//         let bookingInfo = {
//             movie: id,
//             date: bookingFormData.date,
//             seatNumber: bookingFormData.seatNumber,
//             user: localStorage.getItem('userId')
//         }
//         axios.post('/booking', bookingInfo).then((res) => {
//             console.log(res.data)
//             setMyBooking(res.data.booking)
//             toast.success('booking successfull')
//         }).catch((error) => {
//             toast.error('booking unsuccessfull', error)
//         })


//     }

//     console.log(myBooking, "mybooking")

//     const [showSeats, setShowSeats] = useState(false);

//     const handleFocus = () => {
//       setShowSeats(true);
//     };
  
//     const handleBlur = () => {
//       setShowSeats(false);
//     };
 

//     return (
//         <div>
//             {movie && (
//                 <>
//                     <Typography padding={3} fontFamily='fantasy' variant='h4' alignItems='center'>
//                         <center> Book Tickets of Moive : {movie.title}</center>
//                         <Box display='flex' justifyContent='center' alignItems={'self-start'}>
//                             <Box display='flex' justifyContent='center' flexDirection='column' paddingTop={3} width='50%' margin={'auto'}>
//                                 <img width='80%' height='300px' borderRadius="" src={movie.posterUrl} alt="img" />
//                                 <Box width={'80%'} marginTop={3} padding={2}>
//                                     <Typography paddingTop={2}>{movie.desc}</Typography>
//                                     <Typography fontWeight={'bold'} marginTop={1}>
//                                         Actors :
//                                         {movie.actors && movie.actors.map((actor) => (
//                                             <span> {actor} </span>
//                                         ))}
//                                     </Typography>
//                                     <Typography fontWeight={'bold'} marginTop={1}>
//                                         Release Day : {new Date(movie.releaseDate).toDateString()}
//                                     </Typography>
//                                 </Box>
//                             </Box>
//                             <Box display='flex' justifyContent='flex-start' flexDirection='column' width='50%' margin={'auto'}>
//                                 <form onSubmit={handleSubmit}>
//                                     <Box padding={5} margin={'auto'} display={'flex'} flexDirection={'column'}>









//                                         <FormLabel>Seat Number</FormLabel>
//                                         <TextField
//                                             name='seatNumber'
//                                             type='number'
//                                             margin='normal'
//                                             variant='standard'
//                                             value={bookingFormData.seatNumber}
//                                             onChange={handleChange}
//                                         /> 


//                                         <FormLabel>Seat Number</FormLabel>
//                                         <TextField
//                                             name='seatNumber'
//                                             type='number'
//                                             margin='normal'
//                                             variant='standard'
//                                             value={bookingFormData.seatNumber}
//                                             onChange={handleChange}
//                                             onFocus={handleFocus}
//                                             onBlur={handleBlur}
//                                         />
//                                         {showSeats && (
//                                             <div>
//                                                 {Array.from({ length: 100 }, (_, i) => i + 1).map((seatNumber) => (
//                                                     <div key={seatNumber}>Seat {seatNumber}</div>
//                                                 ))}
//                                             </div>
//                                         )}
















//                                         <FormLabel>Booking Date</FormLabel>
//                                         <TextField
//                                             name='date'
//                                             type='date'
//                                             margin='normal'
//                                             variant='standard'
//                                             value={bookingFormData.date}
//                                             onChange={handleChange}
//                                         />
//                                         <Button type='' sx={{ mt: 2, bgcolor: 'black' }}>Book Now</Button>
//                                     </Box>
//                                 </form>
//                             </Box>
//                         </Box>
//                     </Typography>
//                 </>
//             )}
//         </div>
//     );
// };

// export default Booking;
// ChatGPT
// To display the seat numbers when hovering over the input field for the seat number, you can show the seat numbers in a popup or a tooltip. Here's how you can modify your code to achieve this:

// jsx
// Copy code
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getMovieDetails } from '../Apis/api-helper';
// import { Box, Typography, FormLabel, TextField, Button, Tooltip } from '@mui/material';
// import axios from 'axios';
// import { toast } from 'react-toastify'

// const Booking = () => {
//     const { id } = useParams();
//     const [movie, setMovie] = useState({});
//     const [myBooking, setMyBooking] = useState({})
//     const [bookingFormData, setBookingFormData] = useState({
//         seatNumber: '',
//         date: '',
//     });

//     console.log(bookingFormData)

//     const handleChange = (e) => {
//         setBookingFormData((prevData) => ({
//             ...prevData,
//             [e.target.name]: e.target.value,
//         }));
//     };

//     useEffect(() => {
//         getMovieDetails(id)
//             .then((res) => {
//                 setMovie(res);
//             })
//             .catch((error) => console.log(error));
//     }, [id]);

//     function handleSubmit(e) {
//         e.preventDefault()
//         let bookingInfo = {
//             movie: id,
//             date: bookingFormData.date,
//             seatNumber: bookingFormData.seatNumber,
//             user: localStorage.getItem('userId')
//         }
//         axios.post('/booking', bookingInfo).then((res) => {
//             console.log(res.data)
//             setMyBooking(res.data.booking)
//             toast.success('booking successfull')
//         }).catch((error) => {
//             toast.error('booking unsuccessfull', error)
//         })
//     }

//     console.log(myBooking, "mybooking")

//     const [showSeats, setShowSeats] = useState(false);

//     const handleFocus = () => {
//         setShowSeats(true);
//     };

//     const handleBlur = () => {
//         setShowSeats(false);
//     };

//     return (
//         <div>
//             {movie && (
//                 <>
//                     <Typography padding={3} fontFamily='fantasy' variant='h4' alignItems='center'>
//                         <center> Book Tickets of Moive : {movie.title}</center>
//                         <Box display='flex' justifyContent='center' alignItems={'self-start'}>
//                             <Box display='flex' justifyContent='center' flexDirection='column' paddingTop={3} width='50%' margin={'auto'}>
//                                 <img width='80%' height='300px' borderRadius="" src={movie.posterUrl} alt="img" />
//                                 <Box width={'80%'} marginTop={3} padding={2}>
//                                     <Typography paddingTop={2}>{movie.desc}</Typography>
//                                     <Typography fontWeight={'bold'} marginTop={1}>
//                                         Actors :
//                                         {movie.actors && movie.actors.map((actor) => (
//                                             <span> {actor} </span>
//                                         ))}
//                                     </Typography>
//                                     <Typography fontWeight={'bold'} marginTop={1}>
//                                         Release Day : {new Date(movie.releaseDate).toDateString()}
//                                     </Typography>
//                                 </Box>
//                             </Box>
//                             <Box display='flex' justifyContent='flex-start' flexDirection='column' width='50%' margin={'auto'}>
//                                 <form onSubmit={handleSubmit}>
//                                     <Box padding={5} margin={'auto'} display={'flex'} flexDirection={'column'}>
//                                         <FormLabel>Seat Number</FormLabel>
//                                         <TextField
//                                             name='seatNumber'
//                                             type='number'
//                                             margin='normal'
//                                             variant='standard'
//                                             value={bookingFormData.seatNumber}
//                                             onChange={handleChange}
//                                             onFocus={handleFocus}
//                                             onBlur={handleBlur}
//                                         />
//                                         {showSeats && (
//                                             <Tooltip title="Select Seat Number" placement="top-start">
//                                                 <Box bgcolor="white" padding={2} boxShadow={2}>
//                                                     {Array.from({ length: 100 }, (_, i) => i + 1).map((seatNumber) => (
//                                                         <div key={seatNumber}>Seat {seatNumber}</div>
//                                                     ))}
//                                                 </Box>
//                                             </Tooltip>
//                                         )}
//                                         <FormLabel>Booking Date</FormLabel>
//                                         <TextField
//                                             name='date'
//                                             type='date'
//                                             margin='normal'
//                                             variant='standard'
//                                             value={bookingFormData.date}
//                                             onChange={handleChange}
//                                         />
//                                         <Button type='submit' sx={{ mt: 2, bgcolor: 'black' }}>Book Now</Button>
//                                     </Box>
//                                 </form>
//                             </Box>
//                         </Box>
//                     </Typography>
//                 </>
//             )}
//         </div>
//     );
// };

// export default Booking;
// In this modified code:

// I wrapped the seat numbers inside a Tooltip component from Material-UI to display them when hovering over the input field for the seat number.
// The showSeats state is used to control the visibility of the seat numbers. It is set to true when the input field is focused (onFocus), and false when the input field is blurred (onBlur).
// User
// i nee that same layout for seat bookin
// ChatGPT
// Certainly! Below is the modified version of your booking layout with the same seat selection functionality and seat number display on hover:

// jsx
// Copy code
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getMovieDetails } from '../Apis/api-helper';
// import { Box, Typography, FormLabel, TextField, Button, Tooltip } from '@mui/material';
// import axios from 'axios';
// import { toast } from 'react-toastify'

// const Booking = () => {
//     const { id } = useParams();
//     const [movie, setMovie] = useState({});
//     const [myBooking, setMyBooking] = useState({})
//     const [bookingFormData, setBookingFormData] = useState({
//         seatNumber: '',
//         date: '',
//     });

//     console.log(bookingFormData)

//     const handleChange = (e) => {
//         setBookingFormData((prevData) => ({
//             ...prevData,
//             [e.target.name]: e.target.value,
//         }));
//     };

//     useEffect(() => {
//         getMovieDetails(id)
//             .then((res) => {
//                 setMovie(res);
//             })
//             .catch((error) => console.log(error));
//     }, [id]);

//     function handleSubmit(e) {
//         e.preventDefault()
//         let bookingInfo = {
//             movie: id,
//             date: bookingFormData.date,
//             seatNumber: bookingFormData.seatNumber,
//             user: localStorage.getItem('userId')
//         }
//         axios.post('/booking', bookingInfo).then((res) => {
//             console.log(res.data)
//             setMyBooking(res.data.booking)
//             toast.success('booking successfull')
//         }).catch((error) => {
//             toast.error('booking unsuccessfull', error)
//         })
//     }

//     console.log(myBooking, "mybooking")

//     const [showSeats, setShowSeats] = useState(false);

//     const handleFocus = () => {
//         setShowSeats(true);
//     };

//     const handleBlur = () => {
//         setShowSeats(false);
//     };

//     return (
//         <div>
//             {movie && (
//                 <>
//                     <Typography padding={3} fontFamily='fantasy' variant='h4' alignItems='center'>
//                         <center> Book Tickets of Movie: {movie.title}</center>
//                         <Box display='flex' justifyContent='center' alignItems={'self-start'}>
//                             <Box display='flex' justifyContent='center' flexDirection='column' paddingTop={3} width='50%' margin={'auto'}>
//                                 <img width='80%' height='300px' borderRadius="" src={movie.posterUrl} alt="img" />
//                                 <Box width={'80%'} marginTop={3} padding={2}>
//                                     <Typography paddingTop={2}>{movie.desc}</Typography>
//                                     <Typography fontWeight={'bold'} marginTop={1}>
//                                         Actors :
//                                         {movie.actors && movie.actors.map((actor) => (
//                                             <span> {actor} </span>
//                                         ))}
//                                     </Typography>
//                                     <Typography fontWeight={'bold'} marginTop={1}>
//                                         Release Day : {new Date(movie.releaseDate).toDateString()}
//                                     </Typography>
//                                 </Box>
//                             </Box>
//                             <Box display='flex' justifyContent='flex-start' flexDirection='column' width='50%' margin={'auto'}>
//                                 <form onSubmit={handleSubmit}>
//                                     <Box padding={5} margin={'auto'} display={'flex'} flexDirection={'column'}>
//                                         <FormLabel>Seat Number</FormLabel>
//                                         <TextField
//                                             name='seatNumber'
//                                             type='number'
//                                             margin='normal'
//                                             variant='standard'
//                                             value={bookingFormData.seatNumber}
//                                             onChange={handleChange}
//                                             onFocus={handleFocus}
//                                             onBlur={handleBlur}
//                                         />
//                                         {showSeats && (
//                                             <Tooltip title="Select Seat Number" placement="top-start">
//                                                 <Box bgcolor="white" padding={2} boxShadow={2}>
//                                                     <div className="parent">
//                                                         {Array.from({ length: 100 }, (_, i) => i + 1).map((seatNumber) => (
//                                                             <div className="child" key={seatNumber}>Seat {seatNumber}</div>
//                                                         ))}
//                                                     </div>
//                                                 </Box>
//                                             </Tooltip>
//                                         )}
//                                         <FormLabel>Booking Date</FormLabel>
//                                         <TextField
//                                             name='date'
//                                             type='date'
//                                             margin='normal'
//                                             variant='standard'
//                                             value={bookingFormData.date}
//                                             onChange={handleChange}
//                                         />
//                                         <Button type='submit' sx={{ mt: 2, bgcolor: 'black' }}>Book Now</Button>
//                                     </Box>
//                                 </form>
//                             </Box>
//                         </Box>
//                     </Typography>
//                 </>
//             )}
//         </div>
//     );
// };

// export default Booking;
// In this version:

// The seat numbers are displayed inside the tooltip component when hovering over the seat number input field.
// The seat numbers are displayed in the same layout as the booking form.
// The styling for the seat numbers is kept similar to the booking form for consistency.

// 2 / 2

// User
// u can use boostrap popup
// ChatGPT
// Sure, we can utilize Bootstrap's popover to display the seat numbers when hovering over the input field for the seat number. Here's how you can modify your code to achieve this:

// jsx
// Copy code
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getMovieDetails } from '../Apis/api-helper';
// import { Box, Typography, FormLabel, TextField, Button } from '@mui/material';
// import axios from 'axios';
// import { toast } from 'react-toastify'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { OverlayTrigger, Popover } from 'react-bootstrap';

// const Booking = () => {
//     const { id } = useParams();
//     const [movie, setMovie] = useState({});
//     const [myBooking, setMyBooking] = useState({})
//     const [bookingFormData, setBookingFormData] = useState({
//         seatNumber: '',
//         date: '',
//     });

//     console.log(bookingFormData)

//     const handleChange = (e) => {
//         setBookingFormData((prevData) => ({
//             ...prevData,
//             [e.target.name]: e.target.value,
//         }));
//     };

//     useEffect(() => {
//         getMovieDetails(id)
//             .then((res) => {
//                 setMovie(res);
//             })
//             .catch((error) => console.log(error));
//     }, [id]);

//     function handleSubmit(e) {
//         e.preventDefault()
//         let bookingInfo = {
//             movie: id,
//             date: bookingFormData.date,
//             seatNumber: bookingFormData.seatNumber,
//             user: localStorage.getItem('userId')
//         }
//         axios.post('/booking', bookingInfo).then((res) => {
//             console.log(res.data)
//             setMyBooking(res.data.booking)
//             toast.success('booking successfull')
//         }).catch((error) => {
//             toast.error('booking unsuccessfull', error)
//         })
//     }

//     console.log(myBooking, "mybooking")

//     return (
//         <div>
//             {movie && (
//                 <>
//                     <Typography padding={3} fontFamily='fantasy' variant='h4' alignItems='center'>
//                         <center> Book Tickets of Moive : {movie.title}</center>
//                         <Box display='flex' justifyContent='center' alignItems={'self-start'}>
//                             <Box display='flex' justifyContent='center' flexDirection='column' paddingTop={3} width='50%' margin={'auto'}>
//                                 <img width='80%' height='300px' borderRadius="" src={movie.posterUrl} alt="img" />
//                                 <Box width={'80%'} marginTop={3} padding={2}>
//                                     <Typography paddingTop={2}>{movie.desc}</Typography>
//                                     <Typography fontWeight={'bold'} marginTop={1}>
//                                         Actors :
//                                         {movie.actors && movie.actors.map((actor) => (
//                                             <span> {actor} </span>
//                                         ))}
//                                     </Typography>
//                                     <Typography fontWeight={'bold'} marginTop={1}>
//                                         Release Day : {new Date(movie.releaseDate).toDateString()}
//                                     </Typography>
//                                 </Box>
//                             </Box>
//                             <Box display='flex' justifyContent='flex-start' flexDirection='column' width='50%' margin={'auto'}>
//                                 <form onSubmit={handleSubmit}>
//                                     <Box padding={5} margin={'auto'} display={'flex'} flexDirection={'column'}>
//                                         <FormLabel>Seat Number</FormLabel>
//                                         <OverlayTrigger
//                                             trigger="click"
//                                             key={'top'}
//                                             placement={'top'}
//                                             overlay={
//                                                 <Popover id={`popover-positioned-top`}>
//                                                     <Popover.Body>
//                                                         <div className="parent">
//                                                             {Array.from({ length: 100 }, (_, i) => i + 1).map((seatNumber) => (
//                                                                 <div className="child" key={seatNumber}>Seat {seatNumber}</div>
//                                                             ))}
//                                                         </div>
//                                                     </Popover.Body>
//                                                 </Popover>
//                                             }
//                                         >
//                                             <TextField
//                                                 name='seatNumber'
//                                                 type='number'
//                                                 margin='normal'
//                                                 variant='standard'
//                                                 value={bookingFormData.seatNumber}
//                                                 onChange={handleChange}
//                                             />
//                                         </OverlayTrigger>

//                                         <FormLabel>Booking Date</FormLabel>
//                                         <TextField
//                                             name='date'
//                                             type='date'
//                                             margin='normal'
//                                             variant='standard'
//                                             value={bookingFormData.date}
//                                             onChange={handleChange}
//                                         />
//                                         <Button type='submit' sx={{ mt: 2, bgcolor: 'black' }}>Book Now</Button>
//                                     </Box>
//                                 </form>
//                             </Box>
//                         </Box>
//                     </Typography>
//                 </>
//             )}
//         </div>
//     );
// };

// export default Booking;
