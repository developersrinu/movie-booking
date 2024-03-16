
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getMovieDetails } from '../Apis/api-helper';
// import { Box, Typography, FormLabel, TextField, Button as MuiButton, Modal,Autocomplete } from '@mui/material';
// import axios from 'axios';
// import './style/addmovie.css'
// import { toast } from 'react-toastify';


// const Booking = () => {
//     const { id } = useParams();
//     const [movie, setMovie] = useState({});
//     const [bookingFormData, setBookingFormData] = useState({
//         seatNumber: '',
//         date: '',
//     });
//     const [show, setShow] = useState(false);
//     const [selectedSeat, setSelectedSeat] = useState(null);
    
//     useEffect(() => {
//         getMovieDetails(id)
//             .then((res) => {
//                 setMovie(res);
//             })
//             .catch((error) => console.log(error));
//     }, [id]);

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     const handleChange = (e) => {
//         setBookingFormData((prevData) => ({
//             ...prevData,
//             [e.target.name]: e.target.value,
//         }));
//     };

//     function handleSubmit(e) {
//         e.preventDefault();
//         let bookingInfo = {
//             movie: id,
//             date: bookingFormData.date,
//             seatNumber: selectedSeat, // Now use selectedSeat for seat number
//             user: localStorage.getItem('userId')
//         };
//         axios.post('/booking', bookingInfo)
//             .then((res) => {
//                 console.log(res.data);
//                 toast.success('Booking successful');

//             })
//             .catch((error) => {
//                 toast.error('Booking unsuccessful', error);
//             });
//     }

//     // Render available seats
//     const renderSeats = () => {
//         const availableSeats = Array.from({ length: 100 }, (_, index) => index + 1);
//         return availableSeats.map((seatNumber) => (
//             <div
//                 key={seatNumber}
//                 className={`child ${selectedSeat === seatNumber ? 'green-bg' : ''}`}
//                 onClick={() => handleSeatSelection(seatNumber)}
//             >
//                 {seatNumber}
//             </div>
//         ));
//     };

//     const handleSeatSelection = (seatNumber) => {
//         setSelectedSeat(seatNumber);
//     };

//     const top100Films = [ 
//         "IMAX, Hyderabad",
//         "ArcLight Cinemas, Hyderabad",
//         "Kinepolis, Hyderabad",
//         "PVR Cinemas, Banjara Hills",
//         "INOX, GVK One Mall",
//         "Prasads Multiplex, Necklace Road",
//         "Asian Ganga, Dilsukhnagar",
//         "Cinepolis, Manjeera Mall",
//         "SVC Cinemas, Kukatpally",
//         "Miraj Cinemas, Suncity",
//         "Shanti Cinemas, Abids",
//         "Asian M Cube Mall, Attapur",
//         "Sensation Insomnia, Khairatabad",
//         "Cineplex Odeon, Hyderabad",
//         "AMC Theatres, Hyderabad",
//         "Regal Cinemas, Hyderabad",
//         "Vue Cinemas, Hyderabad",
//         "Cineworld, Hyderabad",
//         "Landmark Theatres, Hyderabad",
//         "Alamo Drafthouse Cinema, Hyderabad",
//     ]

//     const timeSlots = [
//         "10:00 AM", 
//         "12:00 PM",
//         "02:00 PM",
//         "04:00 PM",
//         "06:00 PM",
//         "08:00 PM",
//         "10:00 PM"
//       ];


//     return (
//         <div>
//             {movie && (
//                 <>
//                     <Typography padding={2} fontFamily='fantasy' variant='h4' alignItems='center'>
//                         <center> Book Tickets of Movie : {movie.title}</center>
//                         <Box display='flex' justifyContent='center' alignItems={'self-start'} flexWrap={'wrap !important'} id='userProfile'>

//                             <Box display='flex' justifyContent='center' flexDirection='column' paddingTop={3} width='50%' margin={'auto'}>
//                                 <img width='80%' height='300px' borderRadius="" src={movie.posterUrl} alt="img" className='bookImg ' />
//                                 <Box width={'80%'} marginTop={1} padding={1}>
//                                     <Typography paddingTop={1} color={'var(--blue)'}>{movie.desc}</Typography>
//                                     <Typography fontWeight={'semibold'} marginTop={1} color={'var(--blue)'}>
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
//                             <Box display='flex' justifyContent='flex-start' flexDirection='column' width='50%' marginTop={-14} margin={'auto'}>
//                                 <form onSubmit={handleSubmit}>

//                                     <Box padding={5} margin={'-10px auto'} display={'flex'} flexDirection={'column'}>
                                        
// <Box className="flex-class" display="flex" justifyContent={'space-evenly'} padding={'10px'} gap={'10px'}>
//     <span>
//         <Autocomplete
//             disablePortal
//             id="combo-box-demo"
//             options={top100Films}
//             sx={{ width: 260 }}
//             renderInput={(params) => <TextField {...params} label="Select your movie theater" />}
//         />
//     </span>
//     <span>
//         <Autocomplete
//             disablePortal
//             id="combo-box-demo"
//             options={timeSlots}
//             sx={{ width: 260, color:'var(--blue)'}}
//             renderInput={(params) => <TextField {...params} label="Select your slot" />}
//         />
//     </span>
// </Box>


//                                        <MuiButton variant="contained" onClick={handleShow}  style={{ backgroundColor: "var(--blue)", margin: "" }}>
//                                             select your seat
//                                         </MuiButton>
//                                         <Box marginBottom={3}></Box>

//                                         <Modal
//                                             open={show}
//                                             onClose={handleClose}
//                                             aria-labelledby="modal-title"
//                                             aria-describedby="modal-description"
//                                             style={{
//                                                 display: 'flex',
//                                                 alignItems: 'center',
//                                                 justifyContent: 'center',
//                                             }} 
//                                         >
//                                             <Box sx={{ width: 400, bgcolor: 'background.paper', p: 4 }}>
//                                                 <Typography id="modal-description" sx={{ mt: 2 }}>
//                                                     <div className="parent">
//                                                         {renderSeats()}
//                                                     </div>
//                                                 </Typography>
//                                                 <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>

//                                                     <MuiButton variant="contained" onClick={handleClose} sx={{ mr:2, mt:2, bgcolor:'var(--blue)'}}>
//                                                         Close
//                                                     </MuiButton>

//                                                     <MuiButton type='submit' variant="contained" color="primary" sx={{ mr: 2, mt:2,bgcolor:'var(--blue)'}}>
//                                                         Save
//                                                     </MuiButton>
//                                                 </Box>
//                                             </Box>
//                                         </Modal>
//                                         <FormLabel>Booking Date</FormLabel>
//                                         <TextField
//                                             name='date'
//                                             type='date'
//                                             margin='normal'
//                                             variant='standard'
//                                             value={bookingFormData.date}
//                                             onChange={handleChange}
//                                         />
//                                         <MuiButton type='submit' variant="contained" sx={{ mt: 4, bgcolor: 'var(--blue)' }}>Book Now</MuiButton>
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















import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../Apis/api-helper';
import { Box, Typography, FormLabel, TextField, Button as MuiButton, Modal, Autocomplete } from '@mui/material';
import axios from 'axios';
import './style/addmovie.css'
import { toast } from 'react-toastify';


const Booking = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [bookingFormData, setBookingFormData] = useState({
        seatNumber: '',
        date: '',
        theater: '', // Add state for theater
        slot: '' // Add state for slot
    });
    console.log(bookingFormData.theater)
    const [show, setShow] = useState(false);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [selectedTheater, setSelectedTheater] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');

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
            user: localStorage.getItem('userId'),
            theater: selectedTheater, // Add theater to booking info
            slot: selectedSlot // Add slot to booking info
        };
        console.log(bookingInfo)
      
        axios.post('/booking', bookingInfo)
            .then((res) => {
                console.log(res.data);
                toast.success('Booking successful');

            })
            .catch((error) => {
                toast.error('Booking unsuccessful', error);
            });
    }
  //courrent working ===========================================
    // Render available seats
    const renderSeats = () => {
        const availableSeats = Array.from({ length: 150 }, (_, index) => index + 1);
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

      //courrent working ===========================================

    const handleSeatSelection = (seatNumber) => {
        setSelectedSeat(seatNumber);
    };

    const top100Films = [ 
        "IMAX, Hyderabad",
        "ArcLight Cinemas, Hyderabad",
        "Kinepolis, Hyderabad",
        "PVR Cinemas, Banjara Hills",
        "INOX, GVK One Mall",
        "Prasads Multiplex, Necklace Road",
        "Asian Ganga, Dilsukhnagar",
        "Cinepolis, Manjeera Mall",
        "SVC Cinemas, Kukatpally",
        "Miraj Cinemas, Suncity",
        "Shanti Cinemas, Abids",
        "Asian M Cube Mall, Attapur",
        "Sensation Insomnia, Khairatabad",
        "Cineplex Odeon, Hyderabad",
        "AMC Theatres, Hyderabad",
        "Regal Cinemas, Hyderabad",
        "Vue Cinemas, Hyderabad",
        "Cineworld, Hyderabad",
        "Landmark Theatres, Hyderabad",
        "Alamo Drafthouse Cinema, Hyderabad",
    ]

    const timeSlots = [
        "10:00 AM", 
        "12:00 PM",
        "02:00 PM",
        "04:00 PM",
        "06:00 PM",
        "08:00 PM",
        "10:00 PM"
    ];

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
                                        
<Box className="flex-class" display="flex" justifyContent={'space-evenly'} padding={'10px'} gap={'10px'}>
    <span>
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            value={selectedTheater}
            onChange={(event, newValue) => {
                setSelectedTheater(newValue);
            }}
            sx={{ width: 260 }}
            renderInput={(params) => <TextField {...params} label="Select your movie theater" />}
        />
    </span>
    <span>
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={timeSlots}
            value={selectedSlot}
            onChange={(event, newValue) => {
                setSelectedSlot(newValue);
            }}
            sx={{ width: 260, color:'var(--blue)'}}
            renderInput={(params) => <TextField {...params} label="Select your slot" />}
        />
    </span>
</Box>


                                       <MuiButton variant="contained" onClick={handleShow}  style={{ backgroundColor: "var(--blue)", margin: "" }}>
                                            select your seat
                                        </MuiButton>
                                        <Box marginBottom={3}></Box>
                                        {/* //courrent working =========================================== */}
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











































































































































// // import React, { useEffect, useState } from 'react';
// // import { useParams } from 'react-router-dom';
// // import { getMovieDetails } from '../Apis/api-helper';
// // import { Box, Typography, FormLabel, TextField, Button as MuiButton, Modal,Autocomplete } from '@mui/material';
// // import axios from 'axios';
// // import './style/addmovie.css'
// // import { toast } from 'react-toastify';
// // import './style/booking.css'




// // const Booking = () => {
// //     const { id } = useParams();
// //     const [movie, setMovie] = useState({});
// //     const [bookingFormData, setBookingFormData] = useState({
// //         seatNumber: '',
// //         date: '',
// //     });
// //     const [show, setShow] = useState(false);
// //     const [selectedSeat, setSelectedSeat] = useState(null);
    
// //     useEffect(() => {
// //         getMovieDetails(id)
// //             .then((res) => {
// //                 setMovie(res);
// //             })
// //             .catch((error) => console.log(error));
// //     }, [id]);

// //     const handleClose = () => setShow(false);
// //     const handleShow = () => setShow(true);

// //     const handleChange = (e) => {
// //         setBookingFormData((prevData) => ({
// //             ...prevData,
// //             [e.target.name]: e.target.value,
// //         }));
// //     };

// //     const handleSeatSelection = (seatNumber) => {
// //         setSelectedSeat(seatNumber);
// //     };

// //     const handleSubmit = (e) => {
// //         e.preventDefault();
// //         let bookingInfo = {
// //             movie: id,
// //             date: bookingFormData.date,
// //             seatNumber: selectedSeat,
// //             user: localStorage.getItem('userId')
// //         };
// //         axios.post('/booking', bookingInfo)
// //             .then((res) => {
// //                 console.log(res.data);
// //                 toast.success('Booking successful');
// //                 handleClose(); // Close modal after successful booking
// //             })
// //             .catch((error) => {
// //                 toast.error('Booking unsuccessful', error);
// //             });
// //     };

// //     const renderSeats = () => {
// //         const availableSeats = Array.from({ length: 100 }, (_, index) => index + 1);
// //         return availableSeats.map((seatNumber) => (
// //             <div
// //                 key={seatNumber}
// //                 className={`child ${selectedSeat === seatNumber ? 'green-bg' : ''}`}
// //                 onClick={() => handleSeatSelection(seatNumber)}
// //             >
// //                 {seatNumber}
// //             </div>
// //         ));
// //     };

// //     // current working=================

// //     const top100Films = [ 
      
// //         "IMAX, Hyderabad",
// //         "ArcLight Cinemas, Hyderabad",
// //         "Kinepolis, Hyderabad",
// //         "PVR Cinemas, Banjara Hills",
// //         "INOX, GVK One Mall",
// //         "Prasads Multiplex, Necklace Road",
// //         "Asian Ganga, Dilsukhnagar",
// //         "Cinepolis, Manjeera Mall",
// //         "SVC Cinemas, Kukatpally",
// //         "Miraj Cinemas, Suncity",
// //         "Shanti Cinemas, Abids",
// //         "Asian M Cube Mall, Attapur",
// //         "Sensation Insomnia, Khairatabad",
// //         "Cineplex Odeon, Hyderabad",
// //         "AMC Theatres, Hyderabad",
// //         "Regal Cinemas, Hyderabad",
// //         "Vue Cinemas, Hyderabad",
// //         "Cineworld, Hyderabad",
// //         "Landmark Theatres, Hyderabad",
// //         "Alamo Drafthouse Cinema, Hyderabad",
// //     ]

// //     const timeSlots = [
// //         "10:00 AM", 
// //         "12:00 PM",
// //         "02:00 PM",
// //         "04:00 PM",
// //         "06:00 PM",
// //         "08:00 PM",
// //         "10:00 PM"
// //       ];


// //     // current working ================

// //     return (
// //         <div>
// //             {movie && (
// //                 <>
// //                     <Typography padding={2} fontFamily='fantasy' variant='h4' alignItems='center'>
// //                         <center> Book Tickets of Movie : {movie.title}</center>
// //                         <Box display='flex' justifyContent='center' alignItems={'self-start'} flexWrap={'wrap !important'} id='userProfile'>
// //                             <Box display='flex' justifyContent='center' flexDirection='column' paddingTop={3} width='50%' margin={'auto'}>
// //                                 <img width='80%' height='300px' borderRadius="" src={movie.posterUrl} alt="img" className='bookImg ' />
// //                                 <Box width={'80%'} marginTop={1} padding={1}>
// //                                     <Typography paddingTop={1} color={'var(--blue)'}>{movie.desc}</Typography>
// //                                     <Typography fontWeight={'semibold'} marginTop={1} color={'var(--blue)'}>
// //                                         Actors :
// //                                         {movie.actors && movie.actors.map((actor) => (
// //                                             <span> {actor} </span>
// //                                         ))}
// //                                     </Typography>
// //                                     <Typography fontWeight={'bold'} marginTop={1}>
// //                                         Release Day : {new Date(movie.releaseDate).toDateString()}
// //                                     </Typography>
// //                                 </Box>
// //                             </Box>
// //                             <Box display='flex' justifyContent='flex-start' flexDirection='column' width='50%' marginTop={-14} margin={'auto'}>
// //                                 <form onSubmit={handleSubmit}>
// //                                     <Box padding={5} margin={'-10px auto'} 
                                    
// //                                     display={'flex'} flexDirection={'column'}>
// //                                         {/* working======================================== */}


// <Box className="flex-class" display="flex" justifyContent={'space-evenly'} padding={'10px'} gap={'10px'}>
//     <span>
//         <Autocomplete
//             disablePortal
//             id="combo-box-demo"
//             options={top100Films}
//             sx={{ width: 260 }}
//             renderInput={(params) => <TextField {...params} label="Select your movie theater" />}
//         />
//     </span>
//     <span>
//         <Autocomplete
//             disablePortal
//             id="combo-box-demo"
//             options={timeSlots}
//             sx={{ width: 260, color:'var(--blue)'}}
//             renderInput={(params) => <TextField {...params} label="Select your slot" />}
//         />
//     </span>
// </Box>



                    

// //                                         {/* working================ */}
// //                                         <MuiButton variant="contained" onClick={handleShow} style={{ backgroundColor: "var(--blue)", margin: "" }}>
// //                                             select your seat
// //                                         </MuiButton>
// //                                         <Box marginBottom={3}></Box>
// //                                         <Modal
// //                                             open={show}
// //                                             onClose={handleClose}
// //                                             aria-labelledby="modal-title"
// //                                             aria-describedby="modal-description"
// //                                             style={{
// //                                                 display: 'flex',
// //                                                 alignItems: 'center',
// //                                                 justifyContent: 'center',
// //                                             }}
// //                                         >
// //                                             <Box sx={{ width: 400, bgcolor: 'background.paper', p: 4 }}>
// //                                                 <Typography id="modal-description" sx={{ mt: 2 }}>
// //                                                     <div className="parent">
// //                                                         {renderSeats()}
// //                                                     </div>
// //                                                 </Typography>
// //                                                 <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
// //                                                     <MuiButton variant="contained" onClick={handleClose} sx={{ mr:2, mt:2, bgcolor:'var(--blue)'}}>
// //                                                         Close
// //                                                     </MuiButton>
// //                                                     <MuiButton type='submit' variant="contained" color="primary" sx={{ mr: 2, mt:2,bgcolor:'var(--blue)'}}>
// //                                                         Save
// //                                                     </MuiButton>
// //                                                 </Box>
// //                                             </Box>
// //                                         </Modal>
// //                                         <FormLabel>Booking Date</FormLabel>
// //                                         <TextField
// //                                             name='date'
// //                                             type='date'
// //                                             margin='normal'
// //                                             variant='standard'
// //                                             value={bookingFormData.date}
// //                                             onChange={handleChange}
// //                                         />
// //                                         <MuiButton type='submit' variant="contained" sx={{ mt: 4, bgcolor: 'var(--blue)' }}>Book Now</MuiButton>
// //                                     </Box>
// //                                 </form>
// //                             </Box>
// //                         </Box>
// //                     </Typography>
// //                 </>
// //             )}
// //         </div>
// //     );
// // };

// // export default Booking;

// //new code 

// // import React, { useEffect, useState } from 'react';
// // import { useParams } from 'react-router-dom';
// // import { getMovieDetails } from '../Apis/api-helper';
// // import { Box, Typography, FormLabel, TextField, Button as MuiButton, Modal, Autocomplete } from '@mui/material';
// // import axios from 'axios';
// // import './style/addmovie.css';
// // import { toast } from 'react-toastify';
// // import './style/booking.css';

// // const Booking = () => {
// //     const { id } = useParams();
// //     const [movie, setMovie] = useState({});
// //     const [bookingFormData, setBookingFormData] = useState({
// //         seatNumber: '',
// //         date: '',
// //         theatername: '',
// //         slot: '',
// //     });
// //     console.log(bookingFormData)
// //     const [show, setShow] = useState(false);
// //     const [selectedSeat, setSelectedSeat] = useState(null);
// //     const [theater]
    
// //     useEffect(() => {
// //         getMovieDetails(id)
// //             .then((res) => {
// //                 setMovie(res);
// //             })
// //             .catch((error) => console.log(error));
// //     }, [id]);

// //     const handleClose = () => setShow(false);
// //     const handleShow = () => setShow(true);

// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setBookingFormData((prevData) => ({
// //             ...prevData,
// //             [name]: value,
// //         }));
// //     };

// //     const handleSeatSelection = (seatNumber) => {
// //         setSelectedSeat(seatNumber);
// //     };

// //     const handleSubmit = (e) => {
// //         e.preventDefault();
// //         let bookingInfo = {
// //             movie: id,
// //             date: bookingFormData.date,
// //             seatNumber: selectedSeat,
// //             user: localStorage.getItem('userId'),
// //             theatername: bookingFormData.theatername,
// //             slot: bookingFormData.slot,
// //         };
// //         axios.post('/booking', bookingInfo)
// //             .then((res) => {
// //                 console.log(res.data);
// //                 toast.success('Booking successful');
// //                 handleClose(); // Close modal after successful booking
// //             })
// //             .catch((error) => {
// //                 toast.error('Booking unsuccessful', error);
// //             });
// //     };

// //     const renderSeats = () => {
// //         const availableSeats = Array.from({ length: 100 }, (_, index) => index + 1);
// //         return availableSeats.map((seatNumber) => (
// //             <div
// //                 key={seatNumber}
// //                 className={`child ${selectedSeat === seatNumber ? 'green-bg' : ''}`}
// //                 onClick={() => handleSeatSelection(seatNumber)}
// //             >
// //                 {seatNumber}
// //             </div>
// //         ));
// //     };

// //     const top100Films = [ 
// //         "IMAX, Hyderabad",
// //         "ArcLight Cinemas, Hyderabad",
// //         "Kinepolis, Hyderabad",
// //         "PVR Cinemas, Banjara Hills",
// //         "INOX, GVK One Mall",
// //         "Prasads Multiplex, Necklace Road",
// //         "Asian Ganga, Dilsukhnagar",
// //         "Cinepolis, Manjeera Mall",
// //         "SVC Cinemas, Kukatpally",
// //         "Miraj Cinemas, Suncity",
// //         "Shanti Cinemas, Abids",
// //         "Asian M Cube Mall, Attapur",
// //         "Sensation Insomnia, Khairatabad",
// //         "Cineplex Odeon, Hyderabad",
// //         "AMC Theatres, Hyderabad",
// //         "Regal Cinemas, Hyderabad",
// //         "Vue Cinemas, Hyderabad",
// //         "Cineworld, Hyderabad",
// //         "Landmark Theatres, Hyderabad",
// //         "Alamo Drafthouse Cinema, Hyderabad",
// //     ];

// //     const timeSlots = [
// //         "10:00 AM", 
// //         "12:00 PM",
// //         "02:00 PM",
// //         "04:00 PM",
// //         "06:00 PM",
// //         "08:00 PM",
// //         "10:00 PM"
// //     ];

// //     return (
// //         <div>
// //             {movie && (
// //                 <>
// //                     <Typography padding={2} fontFamily='fantasy' variant='h4' alignItems='center'>
// //                         <center> Book Tickets of Movie : {movie.title}</center>
// //                         <Box display='flex' justifyContent='center' alignItems={'self-start'} flexWrap={'wrap !important'} id='userProfile'>
// //                             <Box display='flex' justifyContent='center' flexDirection='column' paddingTop={3} width='50%' margin={'auto'}>
// //                                 <img width='80%' height='300px' borderRadius="" src={movie.posterUrl} alt="img" className='bookImg ' />
// //                                 <Box width={'80%'} marginTop={1} padding={1}>
// //                                     <Typography paddingTop={1} color={'var(--blue)'}>{movie.desc}</Typography>
// //                                     <Typography fontWeight={'semibold'} marginTop={1} color={'var(--blue)'}>
// //                                         Actors :
// //                                         {movie.actors && movie.actors.map((actor) => (
// //                                             <span> {actor} </span>
// //                                         ))}
// //                                     </Typography>
// //                                     <Typography fontWeight={'bold'} marginTop={1}>
// //                                         Release Day : {new Date(movie.releaseDate).toDateString()}
// //                                     </Typography>
// //                                 </Box>
// //                             </Box>
// //                             <Box display='flex' justifyContent='flex-start' flexDirection='column' width='50%' marginTop={-14} margin={'auto'}>
// //                                 <form onSubmit={handleSubmit}>
// //                                     <Box padding={5} margin={'-10px auto'} display={'flex'} flexDirection={'column'}>
// //                                         <Box className="flex-class" display="flex" justifyContent={'space-evenly'} padding={'10px'} gap={'10px'}>
// //                                             <span>
// //                                                 <Autocomplete
// //                                                     disablePortal
// //                                                     id="theater-autocomplete"
// //                                                     options={top100Films}
// //                                                     sx={{ width: 260 }}
// //                                                     renderInput={(params) => <TextField {...params} name="thea" label="Select your movie theater" />}
// //                                                     onChange={handleChange}
// //                                                 />
// //                                             </span>
// //                                             <span>
// //                                                 <Autocomplete
// //                                                     disablePortal
// //                                                     id="slot-autocomplete"
// //                                                     options={timeSlots}
// //                                                     sx={{ width: 260, color:'var(--blue)'}}
// //                                                     renderInput={(params) => <TextField {...params} name="slot" label="Select your slot" />}
// //                                                     onChange={handleChange}
// //                                                 />
// //                                             </span>
// //                                         </Box>
// //                                         <MuiButton variant="contained" onClick={handleShow} style={{ backgroundColor: "var(--blue)", margin: "" }}>
// //                                             select your seat
// //                                         </MuiButton>
// //                                         <Box marginBottom={3}></Box>
// //                                         <Modal
// //                                             open={show}
// //                                             onClose={handleClose}
// //                                             aria-labelledby="modal-title"
// //                                             aria-describedby="modal-description"
// //                                             style={{
// //                                                 display: 'flex',
// //                                                 alignItems: 'center',
// //                                                 justifyContent: 'center',
// //                                             }}
// //                                         >
// //                                             <Box sx={{ width: 400, bgcolor: 'background.paper', p: 4 }}>
// //                                                 <Typography id="modal-description" sx={{ mt: 2 }}>
// //                                                     <div className="parent">
// //                                                         {renderSeats()}
// //                                                     </div>
// //                                                 </Typography>
// //                                                 <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
// //                                                     <MuiButton variant="contained" onClick={handleClose} sx={{ mr:2, mt:2, bgcolor:'var(--blue)'}}>
// //                                                         Close
// //                                                     </MuiButton>
// //                                                     <MuiButton type='submit' variant="contained" color="primary" sx={{ mr: 2, mt:2,bgcolor:'var(--blue)'}}>
// //                                                         Save
// //                                                     </MuiButton>
// //                                                 </Box>
// //                                             </Box>
// //                                         </Modal>
// //                                         <FormLabel>Booking Date</FormLabel>
// //                                         <TextField
// //                                             name='date'
// //                                             type='date'
// //                                             margin='normal'
// //                                             variant='standard'
// //                                             value={bookingFormData.date}
// //                                             onChange={handleChange}
// //                                         />
// //                                         <MuiButton type='submit' variant="contained" sx={{ mt: 4, bgcolor: 'var(--blue)' }}>Book Now</MuiButton>
// //                                     </Box>
// //                                 </form>
// //                             </Box>
// //                         </Box>
// //                     </Typography>
// //                 </>
// //             )}
// //         </div>
// //     );
// // };

// // export default Booking;

// //newcode








































































































































// // const Booking = () => {
// //     const { id } = useParams();
// //     const [movie, setMovie] = useState({});
// //     const [bookingFormData, setBookingFormData] = useState({
// //         seatNumber: '',
// //         date: '',
// //     });
// //     const [show, setShow] = useState(false);
// //     const [selectedSeat, setSelectedSeat] = useState(null);
    
// //     useEffect(() => {
// //         getMovieDetails(id)
// //             .then((res) => {
// //                 setMovie(res);
// //             })
// //             .catch((error) => console.log(error));
// //     }, [id]);

// //     const handleClose = () => setShow(false);
// //     const handleShow = () => setShow(true);

// //     const handleChange = (e) => {
// //         setBookingFormData((prevData) => ({
// //             ...prevData,
// //             [e.target.name]: e.target.value,
// //         }));
// //     };

// //     function handleSubmit(e) {
// //         e.preventDefault();
// //         let bookingInfo = {
// //             movie: id,
// //             date: bookingFormData.date,
// //             seatNumber: selectedSeat, // Now use selectedSeat for seat number
// //             user: localStorage.getItem('userId')
// //         };
// //         axios.post('/booking', bookingInfo)
// //             .then((res) => {
// //                 console.log(res.data);
// //                 toast.success('Booking successful');

// //             })
// //             .catch((error) => {
// //                 toast.error('Booking unsuccessful', error);
// //             });
// //     }
// //     // =======================================working=====================================

// //     // Render available seats
// //     const renderSeats = () => {
// //         const availableSeats = Array.from({ length: 100 }, (_, index) => index + 1);
// //         return availableSeats.map((seatNumber) => (
// //             <div
// //                 key={seatNumber}
// //                 className={`child ${selectedSeat === seatNumber ? 'green-bg' : ''}`}
// //                 onClick={() => handleSeatSelection(seatNumber)}
// //             >
// //                 {seatNumber}
// //             </div>
// //         ));
// //     };


// //     return (
// //         <div>
// //             {movie && (
// //                 <>

// //                     <Typography padding={2} fontFamily='fantasy' variant='h4' alignItems='center'>
// //                         <center> Book Tickets of Movie : {movie.title}</center>
// //                         <Box display='flex' justifyContent='center' alignItems={'self-start'} flexWrap={'wrap !important'} id='userProfile'>

// //                             <Box display='flex' justifyContent='center' flexDirection='column' paddingTop={3} width='50%' margin={'auto'}>
// //                                 <img width='80%' height='300px' borderRadius="" src={movie.posterUrl} alt="img" className='bookImg ' />
// //                                 <Box width={'80%'} marginTop={1} padding={1}>
// //                                     <Typography paddingTop={1} color={'var(--blue)'}>{movie.desc}</Typography>
// //                                     <Typography fontWeight={'semibold'} marginTop={1} color={'var(--blue)'}>
// //                                         Actors :
// //                                         {movie.actors && movie.actors.map((actor) => (
// //                                             <span> {actor} </span>
// //                                         ))}
// //                                     </Typography>
// //                                     <Typography fontWeight={'bold'} marginTop={1}>
// //                                         Release Day : {new Date(movie.releaseDate).toDateString()}
// //                                     </Typography>
// //                                 </Box>
// //                             </Box>

// //                             <Box display='flex' justifyContent='flex-start' flexDirection='column' width='50%' marginTop={-14} margin={'auto'}>
// //                                 <form onSubmit={handleSubmit}>




// //                                     <Box padding={5} margin={'-10px auto'} display={'flex'} flexDirection={'column'}> */}
                                        
 






// //                                        <MuiButton variant="contained" onClick={handleShow}  style={{ backgroundColor: "var(--blue)", margin: "" }}>
// //                                             select your seat
// //                                         </MuiButton>
// //                                         <Box marginBottom={3}></Box>


// //                                         <Modal
// //                                             open={show}
// //                                             onClose={handleClose}
// //                                             aria-labelledby="modal-title"
// //                                             aria-describedby="modal-description"
// //                                             style={{
// //                                                 display: 'flex',
// //                                                 alignItems: 'center',
// //                                                 justifyContent: 'center',
// //                                             }}
// //                                         >
// //                                             <Box sx={{ width: 400, bgcolor: 'background.paper', p: 4 }}>
// //                                                 <Typography id="modal-description" sx={{ mt: 2 }}>
// //                                                     <div className="parent">
// //                                                         {renderSeats()}
// //                                                     </div>
// //                                                 </Typography>
// //                                                 <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>

// //                                                     <MuiButton variant="contained" onClick={handleClose} sx={{ mr:2, mt:2, bgcolor:'var(--blue)'}}>
// //                                                         Close
// //                                                     </MuiButton>

// //                                                     <MuiButton type='submit' variant="contained" color="primary" sx={{ mr: 2, mt:2,bgcolor:'var(--blue)'}}>
// //                                                         Save
// //                                                     </MuiButton>
// //                                                 </Box>
// //                                             </Box>
// //                                         </Modal>
// //                                         <FormLabel>Booking Date</FormLabel>
// //                                         <TextField
// //                                             name='date'
// //                                             type='date'
// //                                             margin='normal'
// //                                             variant='standard'
// //                                             value={bookingFormData.date}
// //                                             onChange={handleChange}
// //                                         />
// //                                         <MuiButton type='submit' variant="contained" sx={{ mt: 4, bgcolor: 'var(--blue)' }}>Book Now</MuiButton>
// //                                     </Box>
// //                                 </form>
// //                             </Box>
// //                         </Box>
// //                     </Typography>
// //                 </>
// //             )}
// //         </div>
// //     );
// // };

// // export default Booking;






































































// // import React, { useEffect, useState } from 'react';
// // import { useParams } from 'react-router-dom';
// // import { getMovieDetails } from '../Apis/api-helper';
// // import { Box, Typography, FormLabel, TextField, Button } from '@mui/material';
// // import axios from 'axios';
// // import { toast } from 'react-toastify'

// // const Booking = () => {
// //     const { id } = useParams();
// //     const [movie, setMovie] = useState({});
// //     const [myBooking, setMyBooking] = useState({})
// //     const [bookingFormData, setBookingFormData] = useState({
// //         seatNumber: '',
// //         date: '',
// //     });

// //     console.log(bookingFormData)

// //     const handleChange = (e) => {
// //         setBookingFormData((prevData) => ({
// //             ...prevData,
// //             [e.target.name]: e.target.value,
// //         }));
// //     };

// //     useEffect(() => {
// //         getMovieDetails(id)
// //             .then((res) => {
// //                 setMovie(res);
// //             })
// //             .catch((error) => console.log(error));
// //     }, [id]);

// //     function handleSubmit(e) {
// //         e.preventDefault()
// //         let bookingInfo = {
// //             movie: id,
// //             date: bookingFormData.date,
// //             seatNumber: bookingFormData.seatNumber,
// //             user: localStorage.getItem('userId')
// //         }
// //         axios.post('/booking', bookingInfo).then((res) => {
// //             console.log(res.data)
// //             setMyBooking(res.data.booking)
// //             toast.success('booking successfull')
// //         }).catch((error) => {
// //             toast.error('booking unsuccessfull', error)
// //         })


// //     }

// //     console.log(myBooking, "mybooking")

// //     const [showSeats, setShowSeats] = useState(false);

// //     const handleFocus = () => {
// //       setShowSeats(true);
// //     };
  
// //     const handleBlur = () => {
// //       setShowSeats(false);
// //     };
 

// //     return (
// //         <div>
// //             {movie && (
// //                 <>
// //                     <Typography padding={3} fontFamily='fantasy' variant='h4' alignItems='center'>
// //                         <center> Book Tickets of Moive : {movie.title}</center>
// //                         <Box display='flex' justifyContent='center' alignItems={'self-start'}>
// //                             <Box display='flex' justifyContent='center' flexDirection='column' paddingTop={3} width='50%' margin={'auto'}>
// //                                 <img width='80%' height='300px' borderRadius="" src={movie.posterUrl} alt="img" />
// //                                 <Box width={'80%'} marginTop={3} padding={2}>
// //                                     <Typography paddingTop={2}>{movie.desc}</Typography>
// //                                     <Typography fontWeight={'bold'} marginTop={1}>
// //                                         Actors :
// //                                         {movie.actors && movie.actors.map((actor) => (
// //                                             <span> {actor} </span>
// //                                         ))}
// //                                     </Typography>
// //                                     <Typography fontWeight={'bold'} marginTop={1}>
// //                                         Release Day : {new Date(movie.releaseDate).toDateString()}
// //                                     </Typography>
// //                                 </Box>
// //                             </Box>
// //                             <Box display='flex' justifyContent='flex-start' flexDirection='column' width='50%' margin={'auto'}>
// //                                 <form onSubmit={handleSubmit}>
// //                                     <Box padding={5} margin={'auto'} display={'flex'} flexDirection={'column'}>









// //                                         <FormLabel>Seat Number</FormLabel>
// //                                         <TextField
// //                                             name='seatNumber'
// //                                             type='number'
// //                                             margin='normal'
// //                                             variant='standard'
// //                                             value={bookingFormData.seatNumber}
// //                                             onChange={handleChange}
// //                                         /> 


// //                                         <FormLabel>Seat Number</FormLabel>
// //                                         <TextField
// //                                             name='seatNumber'
// //                                             type='number'
// //                                             margin='normal'
// //                                             variant='standard'
// //                                             value={bookingFormData.seatNumber}
// //                                             onChange={handleChange}
// //                                             onFocus={handleFocus}
// //                                             onBlur={handleBlur}
// //                                         />
// //                                         {showSeats && (
// //                                             <div>
// //                                                 {Array.from({ length: 100 }, (_, i) => i + 1).map((seatNumber) => (
// //                                                     <div key={seatNumber}>Seat {seatNumber}</div>
// //                                                 ))}
// //                                             </div>
// //                                         )}
















// //                                         <FormLabel>Booking Date</FormLabel>
// //                                         <TextField
// //                                             name='date'
// //                                             type='date'
// //                                             margin='normal'
// //                                             variant='standard'
// //                                             value={bookingFormData.date}
// //                                             onChange={handleChange}
// //                                         />
// //                                         <Button type='' sx={{ mt: 2, bgcolor: 'black' }}>Book Now</Button>
// //                                     </Box>
// //                                 </form>
// //                             </Box>
// //                         </Box>
// //                     </Typography>
// //                 </>
// //             )}
// //         </div>
// //     );
// // };

// // export default Booking;
// // ChatGPT
// // To display the seat numbers when hovering over the input field for the seat number, you can show the seat numbers in a popup or a tooltip. Here's how you can modify your code to achieve this:

// // jsx
// // Copy code
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
