import { AppBar, Toolbar, Box, Button, Drawer, List, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import React, {useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogout, userLogout } from '../redux-store/store';


const Header = () => {
	const isSmallScreen = useMediaQuery('(max-width:600px)');
	const [drawerOpen, setDrawerOpen] = useState(false);
	const isUserLogedIn = useSelector(state => state.user.isLogedIn);
	const isAdminLogedIn = useSelector(state => state.admin.isLogedIn);


	


	const toggleDrawer = () => {
		setDrawerOpen(!drawerOpen);
	};

	const dispatch = useDispatch()

	// useEffect(() => {
	// 	const fetchMovies = async () => {
	// 		try {
	// 			const allMovies = await getAllMovies();
	// 			setMovies(allMovies);
	// 		} catch (error) {
	// 			console.log('Error fetching movies:', error);
	// 		}
	// 	};

	// 	fetchMovies();
	// }, []); // Empty dependency array to ensure it only runs once on mount


	console.log('movies,movies')
	const userId = localStorage.getItem('userId')

	function logout(isAdmin) {
		dispatch(isAdmin ? adminLogout() : userLogout())
	}







	return (
		<AppBar position='stickey' sx={{ bgcolor: 'var(--blue)', padding: '3px', height: "65px" }}>
			<Toolbar className="flex justify-between items-center">
				<Box>
					<Link to='/'>
						<MovieFilterIcon fontSize="large" />
					</Link>
				</Box>

			


				{isSmallScreen ? (
					// Render hamburger icon for small screens
					<Button onClick={toggleDrawer} sx={{ color: 'white' }}>
						<MenuIcon fontSize="large" />
					</Button>
				) : (
					// Render navigation links for larger screens
					<Box className={`flex gap-10`}>
						<Box className="hover:border-b-2 cursor-pointer"> <Link to='/movies'>Movies</Link></Box>
						{
							!isAdminLogedIn && !isUserLogedIn && (
								<>
									<Box className="hover:border-b-2 cursor-pointer"><Link to='/auth'>user</Link></Box>
									<Box className="hover:border-b-2 cursor-pointer"><Link to='/admin'>Admin</Link></Box>
								</>
							)
						}

						{
							isUserLogedIn && (
								<>
									<Box className="hover:border-b-2 cursor-pointer"><Link to={`/userprofile/${userId}`}>user profile</Link></Box>
									<Box className="hover:border-b-2 cursor-pointer"><Link to='/logout' onClick={() => logout(false)}>logout</Link></Box>
								</>
							)
						}
						{
							isAdminLogedIn && (
								<>



									<Box className="hover:border-b-2 cursor-pointer">
										<Link to='/adminprofile'>admin profile</Link>
									</Box>

									<Box className="hover:border-b-2 cursor-pointer"><Link to='/addmoive'>Add Movie</Link></Box>
									<Box className="hover:border-b-2 cursor-pointer"><Link to='/logout' onClick={() => logout(true)}>logout</Link></Box>
								</>
							)
						}

					</Box>
				)}

				{/* Drawer for small screens */}
				<Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer} sx={{ width: '40%' }}>
					<List>
						{/* {['Movies', 'Admin', 'Auth'].map((text) => (
							<ListItem button key={text}>
								<ListItemText primary={text} />
							</ListItem>
						))} */}
						<Box className="hover:border-b-2 cursor-pointer" sx={{ width: '40% !important' }} > <Link to='/movies'>Movies</Link></Box>
						{
							!isAdminLogedIn && !isUserLogedIn && (
								<>
									<Box className="hover:border-b-2 cursor-pointer"><Link to='/auth' >user</Link></Box>
									<Box className="hover:border-b-2 cursor-pointer"><Link to='/admin' >Admin</Link></Box>
								</>
							)
						}
						{
							isUserLogedIn && (
								<>
									<Box className="hover:border-b-2 cursor-pointer"><Link to={`/userprofile/${userId}`}>my profile</Link></Box>
									<Box className="hover:border-b-2 cursor-pointer"><Link to='/' onClick={() => logout(false)}>logout</Link></Box>
								</>
							)
						}

						{
							isAdminLogedIn && (
								<>
									<Box className="hover:border-b-2 cursor-pointer"><Link to='/adminprofile'>AdminProfile</Link></Box>
									<Box className="hover:border-b-2 cursor-pointer"><Link to='/addmoive'>Add Movie</Link></Box>
									<Box className="hover:border-b-2 cursor-pointer"><Link to='/' onClick={() => logout(true)}>logout</Link></Box>
								</>
							)
						}


					</List>
				</Drawer>
			</Toolbar>
		</AppBar>
	);
};

export default Header;





