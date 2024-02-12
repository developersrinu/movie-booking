import React, { useState } from 'react';
import { Box, Button, FormLabel, TextField, Typography } from '@mui/material';
import { addMovie } from '../Apis/api-helper';
import { toast } from 'react-toastify'

const AddMovie = () => {
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    posterUrl: '',
    releaseDate: '',
    actors: []
  });

  const [actorsArr, setActorsArr] = useState(['']);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      actors: actorsArr
    };

    addMovie(updatedFormData).then((res) => {
      toast.success(res.message)
    }).catch((error) => {
      toast.error(error.message)
    })

    console.log('Submitted:', updatedFormData);
  };

  function handleArrItem(e, index) {
    const newItem = e.target.value;
    const newArr = [...actorsArr];
    newArr[index] = newItem;
    setActorsArr(newArr);
  }

  const addNewActorInput = () => {
    setActorsArr(prevState => [...prevState, '']);
  };

  return (
    <form className='mt-6 rounded-xl p-2' onSubmit={handleSubmit}>
      <Box width={'80%'} margin={'auto'} display={'flex'} flexDirection={'column'} padding={3} boxShadow={'10px 10px 20px #ccc'}>
        <Typography textAlign={'center'} variant='h5' fontFamily={'verdana'} color={'var(--blue)'}>
          Add New Movie
        </Typography>
        <FormLabel >Title</FormLabel>
        <TextField name='title' variant='standard' margin='small' value={formData.title} onChange={handleInputChange} />

        <FormLabel>Description</FormLabel>
        <TextField name='desc' variant='standard' margin='small' value={formData.desc} onChange={handleInputChange} />

        <FormLabel>Poster URL</FormLabel>
        <TextField name='posterUrl' variant='standard' margin='small' value={formData.posterUrl} onChange={handleInputChange} />

        <FormLabel>Release Date</FormLabel>
        <TextField name='releaseDate' variant='standard' margin='small' type='date' value={formData.releaseDate} onChange={handleInputChange} />

        <Box display={'flex'} marginTop={2} flexWrap={'wrap'}>
          {actorsArr.map((actor, index) => (
            <Box key={index} marginRight={2} marginBottom={2}>
              <FormLabel>Actor {index + 1}</FormLabel>
              <TextField name={`actors[${index}]`} variant='standard' margin='normal' value={actor} onChange={(e) => handleArrItem(e, index)} />
            </Box>
          ))}
          <Button
            type="button"
            sx={{
              bgcolor: 'var(--blue)',
              color: 'white',
              padding: '6px 16px',
              lineHeight: 1.5,
              height: '36px',
              '&:hover': { bgcolor: 'darkred' },
            }}
            onClick={addNewActorInput}
          >
            Add Actor
          </Button>
        </Box>

        <Button type="submit" sx={{ mt: 2, bgcolor: 'var(--blue)', color: 'white', '&:hover': { bgcolor: 'darkred' } }}>
          Add new movie
        </Button>
      </Box>
    </form>
  );
};

export default AddMovie;







